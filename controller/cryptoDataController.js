import cryptoData from '../models/cryptoDataModel.js';
import logger from '../utils/logger.js';

const getCryptoStats = async (req, res) => {
  const { coin_id } = req.query;

  try {
    const latestCryptoData = await cryptoData.findOne({ coin_id }).sort({ timestamp: -1 });
    if (latestCryptoData) {
      return res
        .status(200)
        .json({ status: 'success', message: 'Successfully fetched latest data', latestCryptoData });
    } else {
      return res.status(404).json({ status: 'failed', message: 'Data not found' });
    }
  } catch (error) {}
};
