import express from 'express';
import { getCryptoStats, getDeviation } from '../controllers/cryptoController.js';
import validateCoinId from '../utils/validateId.js';

const router = express.Router();

router.get('/stats/:coin_id', validateCoinId, getCryptoStats);
router.get('/deviation/:coin_id', validateCoinId, getDeviation);

export default router;
