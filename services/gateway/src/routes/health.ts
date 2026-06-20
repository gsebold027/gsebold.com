import express from 'express';
import logger from '../utils/logger';

export const configureHealthRoutes = (app: express.Application): void => {
  // Basic health endpoint
  app.get('/health', (req, res) => {
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    });
  });

  // Readiness check with dependency validation
  app.get('/ready', async (req, res) => {
    const services: Record<string, any> = {};
    const errors: string[] = [];

    // Check contact service if configured
    const contactServiceUrl = process.env.CONTACT_SERVICE_URL;
    if (contactServiceUrl) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch(`${contactServiceUrl}/health`, {
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        services.contact = {
          status: response.ok ? 'healthy' : 'unhealthy',
          url: contactServiceUrl,
        };

        if (!response.ok) {
          errors.push('Contact service is not responding properly');
          logger.warn({
            service: 'contact',
            url: contactServiceUrl,
            status: response.status
          }, 'Contact service health check failed');
        } else {
          logger.debug({
            service: 'contact',
            url: contactServiceUrl,
            status: response.status
          }, 'Contact service health check passed');
        }
      } catch (error) {
        services.contact = {
          status: 'unhealthy',
          url: contactServiceUrl,
          error: error instanceof Error ? error.message : 'Unknown error',
        };
        errors.push('Contact service is not available');
        
        logger.error({
          service: 'contact',
          url: contactServiceUrl,
          error: error instanceof Error ? error.message : 'Unknown error'
        }, 'Contact service health check error');
      }
    } else {
      services.contact = {
        status: 'not_configured',
        url: null,
      };
    }

    const allHealthy = Object.values(services)
      .filter((s) => s.status !== 'not_configured')
      .every((s) => s.status === 'healthy');

    if (!allHealthy) {
      logger.warn({
        services,
        errors
      }, 'Readiness check failed - some services unhealthy');

      return res.status(503).json({
        status: 'not_ready',
        timestamp: new Date().toISOString(),
        services,
        errors,
      });
    }

    logger.debug({ services }, 'Readiness check passed - all services healthy');

    res.json({
      status: 'ready',
      timestamp: new Date().toISOString(),
      services,
    });
  });

  // Detailed system status endpoint
  app.get('/status', (req, res) => {
    const memoryUsage = process.memoryUsage();

    const statusData = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      system: {
        platform: process.platform,
        arch: process.arch,
        nodeVersion: process.version,
        uptime: process.uptime(),
      },
      process: {
        pid: process.pid,
        memory: {
          rss: `${Math.round(memoryUsage.rss / 1024 / 1024)}MB`,
          heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)}MB`,
          heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)}MB`,
          external: `${Math.round(memoryUsage.external / 1024 / 1024)}MB`,
        },
      },
      environment: process.env.NODE_ENV || 'development',
    };

    logger.debug({
      memory: statusData.process.memory,
      uptime: statusData.system.uptime
    }, 'System status requested');

    res.json(statusData);
  });

  // Root endpoint
  app.get('/', (req, res) => {
    res.json({
      message: 'gsebold.com API Gateway',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    });
  });

  logger.info('Health routes configured');
};