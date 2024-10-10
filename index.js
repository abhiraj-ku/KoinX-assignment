import app from './app.js';
import logger from './utils/logger.js';

const PORT = process.env.PORT;

// Start the server
const server = app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));

// Gracefully close the server on SIGINT (Ctrl+C)
process.on('SIGINT', () => {
  logger.info(`SIGINT signal received, closing the server...`);

  server.close(() => {
    console.log(`Closed the HTTP server gracefully.`);
    process.exit(1);
  });
});

// Gracefully close the server on SIGINT (Ctrl+z)
process.on('SIGTERM', () => {
  logger.info(`SIGINT signal received, closing the server...`);

  server.close(() => {
    console.log(`Closed the HTTP server gracefully.`);
    process.exit(1);
  });
});
