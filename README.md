# Crypto Tracker

A simple Node.js application that tracks cryptocurrency prices, market capitalization, and 24-hour changes for Bitcoin, Matic, and Ethereum. This application fetches data from the CoinGecko API and stores it in MongoDB for easy retrieval.

## Features

- Fetch and store cryptocurrency data every two hours.
- Get the latest stats for a specific cryptocurrency.
- Calculate the standard deviation of the last 100 recorded prices for a cryptocurrency.

### Prerequisites

- Node.js (v14 or later)
- MongoDB (local or MongoDB Atlas)
- API Key from CoinGecko (if required in future)

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd crypto-tracker
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your MongoDB connection URI:

   ```plaintext
   MONGODB_URI=your_mongodb_connection_uri
   PORT=3000
   COIN_GEKO_API=your-api-key

   ```

### Running the Application

To start the application, run the following command:

```bash
npm run dev
```

## Routes

### Get Latest Stats for a Cryptocurrency

- **Endpoint:** `/stats/:coin_id`
- **Method:** GET
- **Parameters:**
  - `coin_id` (path parameter): The ID of the cryptocurrency (e.g., bitcoin, matic-network, ethereum).
- **Example Request:**
  ```plaintext
  GET /stats/bitcoin
  ```
- **Response:**
  ```json
  {
    "coin_id": "bitcoin",
    "price": 50000,
    "market_cap": 900000000000,
    "change_24h": 2.5,
    "timestamp": "2024-10-10T10:00:00Z"
  }
  ```

### Get Price Deviation for a Cryptocurrency

- **Endpoint:** `/deviation/:coin_id`
- **Method:** GET
- **Parameters:**
  - `coin_id` (path parameter): The ID of the cryptocurrency (e.g., bitcoin, matic-network, ethereum).
- **Example Request:**
  ```plaintext
  GET /deviation/bitcoin
  ```
- **Response:**
  ```json
  {
    "standard_deviation": 2500.5
  }
  ```

## Deployment

This application is configured and ready to be deployed on AWS. However, due to EC2 costs, it is currently not deployed.
