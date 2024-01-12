import winston, { transports, format } from 'winston';
import expressWinston from 'express-winston';

const options = {
  format: format.combine(
    format.timestamp({ format: 'HH:mm:ss' }),
    format.splat(),
    format.json()
  ),
  transports: [new transports.Console()],
};

const logger = winston.createLogger({
  level: 'info',
  ...options,
});

const loggerMiddleware = expressWinston.logger({
  expressFormat: false, // Use the default Express/morgan request formatting. Enabling this will override any msg if true. Will only output colors with colorize set to true
  meta: false, // optional: control whether you want to log the meta data about the request (default to true)
  winstonInstance: logger,
});

const errorLogger = expressWinston.errorLogger({
  level: 'error',
  winstonInstance: logger,
});

export { logger, loggerMiddleware, errorLogger };
