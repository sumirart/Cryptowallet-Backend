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
  getBankAccount: (userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM bank_account WHERE user_id = $1",
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
  addBankAccount: (userId, accountNumber, accountName, bankId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "INSERT INTO bank_account(user_id, account_number, account_name, bank_id) VALUES($1, $2, $3, $4)",
        [userId, accountNumber, accountName, bankId],
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
