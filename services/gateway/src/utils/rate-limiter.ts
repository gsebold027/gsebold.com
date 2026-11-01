import express from 'express';
import rateLimit from 'express-rate-limit';
import { ApiErrorResponse } from '@gsebold/schemas';

import logger from './logger';

type RateLimiterOptions = {
  windowMs: number;
  max: number;
  message?: string;
  logLabel?: string;
};

export const createRateLimiter = ({
  windowMs,
  max,
  message = 'Too many requests, please try again later.',
  logLabel = 'Rate limit exceeded',
}: RateLimiterOptions): express.RequestHandler =>
  rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
      logger.warn({ ip: req.ip, url: req.url }, logLabel);

      const body: ApiErrorResponse = {
        success: false,
        message: 'Rate limit exceeded',
        timestamp: new Date().toISOString(),
        error: message,
      };
      res.status(429).json(body);
    },
  }) as unknown as express.RequestHandler;
