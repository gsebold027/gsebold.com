import express from 'express';
import rateLimit from 'express-rate-limit';

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
      res.status(429).json({ message });
    },
  }) as unknown as express.RequestHandler;
