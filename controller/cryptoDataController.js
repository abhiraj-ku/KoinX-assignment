import cryptoModel from '../models/cryptoDataModel.js';

// Validate if coin_id is present in param or not

export const getStats = async (req, res) => {
  const { coin_id } = req.params;

  // Additionaly i have created Middleware to check coin_id is present or not
  // it is passed as Middleware in the route handler
  // this is more robust way to check the coin_id is present
  // by this way we can evaluate if only accepted id are given as param to /stat/:id or /deviation/:id

  // check if coin_id is present in param or not
  if (!coin_id) {
    logger.error('coin_id is missing');
    return res.status(400).json({ message: 'coin_id is missing, please provide one' });
  }

  try {
    const latestData = await cryptoModel.findOne({ coin_id }).sort({ timestamp: -1 });
    if (!latestData) {
      logger.warn(`No data found for coin_id: ${coin_id}`);
      return res.status(404).send('Data not found');
    }
    logger.info(`Successfully retrieved latest data for coin_id: ${coin_id}`);
    res.json(latestData);
  } catch (error) {
    logger.error(`Server error while fetching stats for coin_id: ${coin_id} - ${error.message}`);
    res.status(500).send('Server error');
  }
};

// API controller to find standard deviation for the last 100 prices of a cryptocurrency

export const getDeviation = async (req, res) => {
  const { coin_id } = req.params;
  if (!coin_id) {
    logger.error('coin_id is missing');
    return res.status(400).json({ message: 'coin_id is missing, please provide one' });
  }

  try {
    const records = await cryptoModel.find({ coin_id }).sort({ timestamp: -1 }).limit(100);

    if (records.length === 0) {
      logger.warn(`Insufficient data to calculate deviation`);
      return res
        .status(404)
        .send('Insufficient data to calculate deviation for coin_id: ${coin_id}');
    }
    const prices = records.map((record) => record.price);
    const deviation = calculateStandardDeviation(prices);

    logger.info(`Successfully calculated deviation for coin_id: ${coin_id}`);
    res.json({ standard_deviation: deviation });
  } catch (error) {
    logger.error(
      `Server error while calculating deviation for coin_id: ${coin_id} - ${error.message}`
    );
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
