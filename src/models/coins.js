const pool = require("../configs/db");

module.exports = {
  getCoins: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM cryptocurrencies_list", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
};
