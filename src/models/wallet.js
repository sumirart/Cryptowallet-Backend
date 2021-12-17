const pool = require("../configs/db");

module.exports = {
  getWallet: (userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT * FROM wallet WHERE user_id = $1",
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
  topup: (userId, amount) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `WITH ins1 AS (INSERT INTO wallet_transaction (user_id, wallet_id, code, amount, bank_account_id, bank_code_id, bank_account_number, date)
        SELECT $1, wallet.id, 100, $2, null, null, null, current_timestamp FROM wallet WHERE user_id = $1)
        UPDATE wallet SET amount = amount + $2 WHERE user_id = $1 RETURNING id, amount, currency`,
        [userId, amount],
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
  withdraw: (userId, amount, bankAccountId, bankCodeId, bankAccountNumber) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `WITH ins1 AS (INSERT INTO wallet_transaction (user_id, wallet_id, code, amount, bank_account_id, bank_code_id, bank_account_number, date)
        SELECT $1, wallet.id, 200, $2, $3, $4, $5, current_timestamp FROM wallet WHERE user_id = $1)
        UPDATE wallet SET amount = amount - $2 WHERE user_id = $1 RETURNING id, amount, currency`,
        [userId, amount, bankAccountId, bankCodeId, bankAccountNumber],
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
