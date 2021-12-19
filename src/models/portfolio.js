const pool = require("../configs/db");

module.exports = {
  getPortfolio: (userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `SELECT portfolio.id, user_id, amount, coin_id, cryptocurrencies_list.name AS coin_name, symbol FROM portfolio
      JOIN cryptocurrencies_list ON portfolio.coin_id = cryptocurrencies_list.id
      WHERE portfolio.user_id = $1`,
        [userId],
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.rows);
          }
        }
      );
    });
  },
};
