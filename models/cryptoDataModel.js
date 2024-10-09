import mongoose from "mongoose";

// List of valid coin IDs
const validCoins = ["bitcoin", "matic-network", "ethereum"];

const cryptoDataSchema = new mongoose.Schema(
  {
    coin_id: {
      type: String,
      require: true,
      enum: validCoins,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    market_cap: {
      type: Number,
      required: true,
      min: 0,
    },
    change_24h: {
      type: Number,
      reuired: true,
    },
  },
  { timestamps: true }
);

// Index on coin_id
cryptoDataSchema.index({ coin_id: 1 });

// Middleware to update the updatedAt field before saving
cryptoDataSchema.pre("save", function (next) {
  this.updatedAt = new Date();
  next();
});

const cryptoData = mongoose.model("CryptoData", cryptoDataSchema);

export default cryptoData;
