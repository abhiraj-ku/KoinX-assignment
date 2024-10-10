import express from 'express';
import { getCryptoStats, getDeviation } from '../controller/cryptoDataController.js';
import validateCoinId from '../middlewares/validateId.js';

const router = express.Router();

router.get('/stats/:coin_id', validateCoinId, getCryptoStats);
router.get('/deviation/:coin_id', validateCoinId, getDeviation);

export default router;
