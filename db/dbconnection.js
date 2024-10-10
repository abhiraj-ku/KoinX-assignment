import mongoose from 'mongoose';
import logger from '../utils/logger.js'; // Adjust the path as necessary

const MONGODB_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    logger.info('MongoDB connected');
  } catch (error) {
    logger.error('MongoDB connection error:', error);
    // Optionally, we can implement a retry mechanism after fail request
    // this will take number of retries and retry time and runs a loop
    // for given duration and tries to connect to db
    process.exit(1);
  }
};

export default connectDB;
