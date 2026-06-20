import compression from 'compression';
import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

import { httpLogger, logger } from '../utils/logger';

// CORS origin configuration
const getAllowedOrigins = (): string[] | boolean => {
  const corsOrigin = process.env.CORS_ORIGIN;

  if (!corsOrigin) {
    // In development, allow all origins
    return process.env.NODE_ENV === 'development';
  }

  const origins = corsOrigin.split(',').map((origin) => origin.trim());
  const additionalOrigins: string[] = [];

  origins.forEach((origin) => {
    if (origin.includes('gsebold.com') && !origin.includes('api.')) {
      const apiOrigin = origin.replace('gsebold.com', 'api.gsebold.com');
      if (!origins.includes(apiOrigin)) {
        additionalOrigins.push(apiOrigin);
      }
    }
  });

  return [...origins, ...additionalOrigins];
};

export const configureMiddleware = (app: express.Application): void => {
  // Trust proxy for Railway
  app.set('trust proxy', 1);

  // HTTP request logging (early in the chain)
  app.use(httpLogger);

  // Security middleware
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", 'data:', 'https:'],
        },
      },
    }),
  );

  const allowedOrigins = getAllowedOrigins();

  app.use(
    cors({
      origin: (origin, callback) => {
        if (!origin) return callback(null, true);

        if (Array.isArray(allowedOrigins)) {
          if (allowedOrigins.includes(origin)) {
            return callback(null, true);
          } else {
            logger.warn({ origin, allowedOrigins }, 'CORS request blocked - origin not allowed');
            return callback(new Error('Not allowed by CORS'), false);
          }
        }

        return callback(null, allowedOrigins);
      },
      credentials: process.env.CORS_CREDENTIALS === 'true',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'X-Requested-With',
        'X-API-Key',
        'Origin',
        'Accept',
      ],
      exposedHeaders: ['X-Total-Count', 'X-Request-ID'],
      preflightContinue: false,
      optionsSuccessStatus: 204,
    }),
  );

  // Compression
  app.use(compression());

  // Rate limiting
  const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW || '900000'), // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX || '100'),
    message: {
      error: {
        message: 'Rate limit exceeded',
        statusCode: 429,
        timestamp: new Date().toISOString(),
      },
    },
    standardHeaders: true,
    legacyHeaders: false,
    // Log rate limit hits
    handler: (req, res) => {
      logger.warn(
        {
          ip: req.ip,
          userAgent: req.get('user-agent'),
          url: req.url,
        },
        'Rate limit exceeded',
      );

      res.status(429).json({
        error: {
          message: 'Rate limit exceeded',
          statusCode: 429,
          timestamp: new Date().toISOString(),
        },
      });
    },
  });

  // express-rate-limit v7 types conflict with @types/express v5 in pnpm; bypass needed
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  app.use(limiter as any);

  logger.info(
    {
      allowedOrigins: Array.isArray(allowedOrigins) ? allowedOrigins : 'all',
      corsCredentials: process.env.CORS_CREDENTIALS === 'true',
    },
    'Security middleware configured',
  );
};

export const configureBodyParsing = (app: express.Application): void => {
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ extended: true, limit: '10mb' }));

  logger.info('✅ Body parsing configured');
};

export const configureErrorHandling = (app: express.Application): void => {
  app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(
      {
        err,
        req: {
          method: req.method,
          url: req.url,
          headers: req.headers,
          ip: req.ip,
        },
      },
      'Express error occurred',
    );

    if (res.headersSent) {
      return next(err);
    }

    const statusCode = (err as any).statusCode || (err as any).status || 500;

    res.status(statusCode).json({
      error: {
        message: statusCode === 500 ? 'Internal Server Error' : err.message,
        statusCode,
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method,
      },
    });
  });

  // 404 handler
  app.use((req: express.Request, res: express.Response) => {
    logger.warn(
      {
        method: req.method,
        url: req.url,
        ip: req.ip,
        userAgent: req.get('user-agent'),
      },
      'Route not found',
    );

    res.status(404).json({
      error: {
        message: 'Route not found',
        statusCode: 404,
        timestamp: new Date().toISOString(),
        path: req.url,
        method: req.method,
      },
    });
  });

  logger.info('Error handling configured');
};
