import pino from 'pino'
import pinoHttp from 'pino-http'

// Create the base logger instance
export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport:
    process.env.NODE_ENV === 'development'
      ? {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'yyyy-mm-dd HH:MM:ss',
            ignore: 'pid,hostname'
          }
        }
      : undefined,
  serializers: {
    req: pino.stdSerializers.req,
    res: pino.stdSerializers.res,
    err: pino.stdSerializers.err
  }
})

// Create the HTTP logger middleware
export const httpLogger = pinoHttp({
  logger,
  customLogLevel: (req, res, err) => {
    if (res.statusCode >= 400 && res.statusCode < 500) {
      return 'warn'
    } else if (res.statusCode >= 500 || err) {
      return 'error'
    } else if (res.statusCode >= 300 && res.statusCode < 400) {
      return 'silent'
    }
    return 'info'
  },
  serializers: {
    req: (req: any) => ({
      method: req.method,
      url: req.url,
      headers: {
        'user-agent': req.headers['user-agent'],
        'content-type': req.headers['content-type'],
        authorization: req.headers['authorization'] ? '[REDACTED]' : undefined
      },
      remoteAddress: req.remoteAddress,
      remotePort: req.remotePort
    }),
    res: (res: any) => ({
      statusCode: res.statusCode,
      headers: {
        'content-type': res.getHeader ? res.getHeader('content-type') : undefined,
        'content-length': res.getHeader ? res.getHeader('content-length') : undefined
      }
    })
  },
  customProps: (req: any, res: any) => ({
    responseTime: res.responseTime
  })
})

export default logger
