const pool = require("../configs/db");

module.exports = {
  getBankCodes: () => {
    return new Promise((resolve, reject) => {
      pool.query("SELECT * FROM bank_codes", (error, result) => {
        if (error) {
          reject(error);
        } else {
          resolve(result.rows);
        }
      });
    });
  },
};
