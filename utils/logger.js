import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';

const transport = new transports.DailyRotateFile({
  filename: '/var/log/KoinX-logs/app-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  zippedArchive: true,
  maxSize: '20m',
  maxFiles: '14d',
});

const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp(),
    format.printf(({ timestamp, level, message }) => {
      return `${timestamp} [${level.toUpperCase()}]: ${message}`;
    })
  ),
  transports: [new transports.Console(), transport, transports.File({ filename: 'app.log' })],
});

export default logger;
