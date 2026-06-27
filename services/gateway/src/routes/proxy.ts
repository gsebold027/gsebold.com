import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { ApiErrorResponse } from '@gsebold/schemas';

import logger from '../utils/logger';
import { createRateLimiter } from '../utils/rate-limiter';

const contactFormLimiter = (): express.RequestHandler =>
  createRateLimiter({
    windowMs: 60 * 15 * 1000,
    max: 5,
    logLabel: 'Contact form rate limit exceeded',
  });

export const configureProxyRoutes = (app: express.Application): void => {
  const contactServiceUrl = process.env.CONTACT_SERVICE_URL;

  if (contactServiceUrl) {
    logger.info({ target: contactServiceUrl }, 'Setting up contact service proxy');

    const contactProxy = createProxyMiddleware({
      target: contactServiceUrl,
      changeOrigin: true,
      pathRewrite: {
        '^/contact': '/',
      },
      on: {
        error: (err: any, req: any, res: any) => {
          logger.error(
            {
              error: err.message,
              code: err.code,
              method: req.method,
              url: req.url,
              target: contactServiceUrl,
              service: 'contact',
            },
            'Contact service proxy error',
          );

          if (!res.headersSent) {
            const body: ApiErrorResponse = {
              success: false,
              message: 'Contact service temporarily unavailable',
              timestamp: new Date().toISOString(),
              error: err.message ?? 'Proxy error',
            };
            res.status(503).json(body);
          }
        },
        proxyReq: (proxyReq: any, req: any) => {
          logger.debug(
            {
              method: req.method,
              originalUrl: req.url,
              targetUrl: `${contactServiceUrl}${proxyReq.path}`,
              service: 'contact',
              headers: {
                'content-type': req.headers['content-type'],
                'x-forwarded-host': req.headers.host,
              },
            },
            'Proxying request to contact service',
          );

          // Add headers for internal routing
          proxyReq.setHeader('x-forwarded-host', req.headers.host || '');
          proxyReq.setHeader('x-forwarded-proto', req.headers['x-forwarded-proto'] || 'https');
          proxyReq.setHeader('x-gateway', 'gsebold-gateway');
          proxyReq.setHeader('x-forwarded-for', req.ip || '');
        },
        proxyRes: (proxyRes: any, req: any) => {
          logger.info(
            {
              method: req.method,
              url: req.url,
              statusCode: proxyRes.statusCode,
              statusMessage: proxyRes.statusMessage,
              service: 'contact',
              target: contactServiceUrl,
              responseTime: Date.now() - req.startTime,
            },
            'Contact service response received',
          );
        },
      },
    } as any);

    app.post('/contact/email/contactMe', contactFormLimiter(), contactProxy);

    app.use('/contact', contactProxy);
    logger.info('Contact service proxy configured');
  } else {
    logger.warn('CONTACT_SERVICE_URL not set, adding fallback contact routes');

    // Fallback routes for contact service
    app.all('/contact/*', (req, res) => {
      logger.warn(
        {
          method: req.method,
          url: req.url,
          ip: req.ip,
          service: 'contact',
        },
        'Contact service not configured - serving fallback response',
      );

      const body: ApiErrorResponse = {
        success: false,
        message: 'Contact service not configured',
        timestamp: new Date().toISOString(),
        error: 'CONTACT_SERVICE_URL environment variable is not set',
      };
      res.status(503).json(body);
    });

    logger.warn('Contact service fallback routes configured');
  }
};
