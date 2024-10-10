import axios from 'axios';
import cryptoData from '../models/cryptoDataModel.js';
import logger from '../utils/logger.js';
import dotenv from 'dotenv';
dotenv.config();

// Function to fetch cryptocurrency data and save it to MongoDB
const fetchCryptoData = async () => {
  const coins = ['bitcoin', 'matic-network', 'ethereum'];

  try {
    // Fetch current prices, market caps, and 24-hour changes for the specified cryptocurrencies
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: coins.join(','),
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
      headers: {
        Authorization: `Bearer ${process.env.API_KEY}`, // Include your API key in the headers
      },
    });

    const data = response.data;

    // Prepare the records to be saved in MongoDB
    const records = coins.map((coin) => ({
      coin_id: coin,
      price: data[coin].usd,
      market_cap: data[coin].usd_market_cap,
      change_24h: data[coin].usd_24h_change,
      timestamp: new Date(),
    }));

    // Insert the records into the database
    await cryptoData.create(records);
    await cryptoData.Save();
    logger.info('Data saved successfully:', records);
  } catch (error) {
    // Log any errors encountered during the fetch or save operations
    logger.error('Error fetching data:', error);
  }
};
export default fetchCryptoData;
