const pool = require("../configs/db");

module.exports = {
  buy: (userId, coinId, amount, price) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `WITH insertToHistory AS (INSERT INTO exchanges_history (user_id, wallet_id, coin_id, amount, code, price, date)
      SELECT $1, wallet.id, $2, $3, 100, $4, current_timestamp FROM wallet where user_id = $1),
      updateWallet AS (UPDATE wallet SET amount = amount - $4 WHERE user_id = $1 RETURNING amount AS amount)
      UPDATE portfolio SET amount = amount + $3 WHERE user_id = $1 RETURNING user_id, amount`,
        [userId, coinId, amount, price],
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
