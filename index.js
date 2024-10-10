import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cron from 'node-cron';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import fetchCryptoData from './services/fetchCryptoData.js';
import cryptoRoutes from './routes/coinDataRoute.js';
import logger from './utils/logger.js';
import connectDB from './db/dbconnection.js';
import morgan from 'morgan';
import crypto from 'node:crypto';

const PORT = process.env.PORT;
// Connect to MongoDB
connectDB();
const app = express();

// Log HTTP requests
app.use(morgan('tiny'));

// Rate limit middleware
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 50,
  message: 'Too many requests, Try again later',
});

// Middleware to generate a unique nonce for each request
app.use((req, res, next) => {
  // Generate a unique nonce for each request
  res.locals.scriptNonce = crypto.randomBytes(16).toString('base64');
  next();
});

// Helmet configuration with Content Security Policy
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        baseUri: ["'self'"],
        fontSrc: ["'self'", 'https:', 'data:'],
        formAction: ["'self'"],
        frameAncestors: ["'self'"],
        imgSrc: ["'self'", 'data:'],
        objectSrc: ["'none'"],
        // Allows inline scripts with a valid nonce and scripts from 'self'
        scriptSrc: ["'self'", (req, res) => `'nonce-${res.locals.scriptNonce}'`],
        scriptSrcAttr: ["'none'"],
        styleSrc: ["'self'", 'https:', "'unsafe-inline'"], // Be cautious with 'unsafe-inline'
        upgradeInsecureRequests: [],
      },
    },
  })
);

// Schedule the job to run every 2 hours
cron.schedule('0 */2 * * *', fetchCryptoData);

// Root route for Helmet config
app.get('/', (req, res) => {
  // Include nonce in the inline script for demonstration
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Koinx Assignment</title>
    </head>
    <body>
      <h3>Hello, KoinX team this is <a href="https://github.com/abhiraj-ku" target="_blank">Abhishek Kumar!</a></h3>
      <script nonce="${res.locals.scriptNonce}">
        console.log('This script runs because it has a valid nonce.');
      </script>
    </body>
    </html>
  `);
});

// Route handler for handling stats and deviation route
app.use('/api/v1/', limiter, cryptoRoutes);

// Start the server
app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
