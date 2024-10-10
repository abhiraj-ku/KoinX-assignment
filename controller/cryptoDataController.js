import { validationResult, query, param } from 'express-validator';
import cryptoModel from '../models/cryptoDataModel.js';

// Validate if coin_id is present in param or not

export const getStats = async (req, res) => {
  const { coin_id } = req.params;

  // Additionaly i have created Middleware to check coin_id is present or not
  // it is passed as Middleware in the route handler

  // check if coin_id is present in param or not
  if (!coin_id) {
    logger.error('coin_id is missing');
    return res.status(400).json({ message: 'coin_id is missing, please provide one' });
  }

  try {
    const latestData = await cryptoModel.findOne({ coin_id }).sort({ timestamp: -1 });
    if (latestData) {
      res.json(latestData);
    } else {
      res.status(404).send('Data not found');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

export const getDeviation = async (req, res) => {
  const { coin_id } = req.params;
  if (!coin_id) {
    logger.error('coin_id is missing');
    return res.status(400).json({ message: 'coin_id is missing, please provide one' });
  }

  try {
    const records = await cryptoModel.find({ coin_id }).sort({ timestamp: -1 }).limit(100);
    if (records.length > 0) {
      const prices = records.map((record) => record.price);
      const deviation = calculateStandardDeviation(prices);
      res.json({ standard_deviation: deviation });
    } else {
      res.status(404).send('Not enough data');
    }
  } catch (error) {
    res.status(500).send('Server error');
  }
};

// Function to calculate the standard deviation
const calculateStandardDeviation = (data) => {
  const n = data.length;
  const mean = data.reduce((acc, val) => acc + val, 0) / n;
  const variance = data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / n;
  return Math.sqrt(variance);
};
