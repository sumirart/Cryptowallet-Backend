const pool = require("../configs/db");

module.exports = {
  register: (displayName, email, password) => {
    return new Promise((resolve, reject) => {
      pool.query(
        `WITH register AS (
                INSERT INTO user_account (display_name, email, password, active)
                VALUES ($1, $2, $3, true)
                RETURNING id AS user_id),
              addportfolio AS (
                INSERT INTO portfolio (user_id, coin_id, amount)
                SELECT user_id, 1, 0 FROM register)
              INSERT INTO wallet (user_id, amount, currency)
              SELECT user_id, 0, 'USD' FROM register;`,
        [displayName, email, password],
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
  login: (email) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT id, email, password, display_name FROM user_account WHERE email = $1",
        [email],
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
