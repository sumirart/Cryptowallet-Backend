require("dotenv").config();

module.exports = {
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    post: process.env.DB_PORT,
  },
  coinMarketCapAPIKey: process.env.COINMARKETCAP_API_KEY,
};
