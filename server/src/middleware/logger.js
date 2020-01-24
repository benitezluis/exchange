const { createLogger, format, transports } = require('winston');
const LogzioWinstonTransport = require('winston-logzio');
require('winston-mongodb');

const isProductionEnv = process.env.NODE_ENV === 'production';

const logger = (app) => {
  const formatter = format.combine(
    format.splat(),
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info) => {
      const {
        timestamp, level, message,
      } = info;
      const ts = timestamp.slice(0, 19).replace('T', ' ');
      return `${ts} [${level}]: ${message} : ''}`;
    }),
  );

  const transport = new transports.Console({
    format: formatter
  });

  const winstonLogger = createLogger({
    // To see more detailed errors, change this to 'debug'
    level: isProductionEnv ? 'error' : 'debug',
    transports: [transport]
  });

  return winstonLogger
}

module.exports = logger;