import express from 'express';
import { getCryptoStats, getDeviation } from '../controllers/cryptoController.js';
import { param } from 'express-validator';

const router = express.Router();

router.get('/stats/:coin_id', param('coin_id').isString(), getCryptoStats);
router.get('/deviation/:coin_id', param('coin_id').isString(), getDeviation);

export default router;
