import 'dotenv/config';
import express from 'express';

import { configureBodyParsing, configureErrorHandling, configureMiddleware } from './middleware';
import { configureHealthRoutes } from './routes/health';
import { configureProxyRoutes } from './routes/proxy';
import logger from './utils/logger';

const app = express();
const PORT = parseInt(process.env.PORT || '3000');

const gracefulShutdown = (signal: string) => {
  logger.info({ signal }, 'Received shutdown signal, shutting down gracefully');
  process.exit(0);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

const startServer = async (): Promise<void> => {
  try {
    logger.info('Starting gsebold.com API Gateway...');

    // Configure all middleware and routes
    configureMiddleware(app);
    configureProxyRoutes(app);
    configureBodyParsing(app);
    configureHealthRoutes(app);
    configureErrorHandling(app);

    // Start the server
    app.listen(PORT, () => {
      logger.info(
        {
          port: PORT,
          environment: process.env.NODE_ENV || 'development',
          contactServiceUrl: process.env.CONTACT_SERVICE_URL || 'Not configured',
        },
        'Express API Gateway running',
      );

      logger.info('Gateway startup complete!');
    });
  } catch (error) {
    logger.error({ error }, 'Failed to start server');
    process.exit(1);
  }
};

app.use((req: any, res, next) => {
  req.startTime = Date.now();
  next();
});

startServer();
