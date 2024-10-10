import { param, validationResult } from 'express-validator';

const validCoins = ['bitcoin', 'matic-network', 'ethereum'];

const validateCoinId = [
  param('coin_id')
    .exists()
    .withMessage('coin_id is required')
    .isString()
    .withMessage('coin_id must be a string')
    .isIn(validCoins)
    .withMessage(`coin_id must be one of: ${validCoins.join(', ')}`),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

export default validateCoinId;
