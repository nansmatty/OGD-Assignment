import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
  transports: [
    new winston.transports.File({ dirname: 'logs', filename: 'error.log', level: 'error' }),
    new winston.transports.File({ dirname: 'logs', filename: 'combined.log', level: 'info' }),
    new winston.transports.Console({ format: winston.format.simple(), level: 'info' }),
  ],
});

export default logger;
