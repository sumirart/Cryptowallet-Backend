const pool = require("../configs/db");

module.exports = {
  getUserProfile: (userId) => {
    return new Promise((resolve, reject) => {
      pool.query(
        "SELECT id, display_name, email, profile_picture, nama_lengkap, tempat_lahir, tanggal_lahir, negara, provinsi, kota, kode_pos FROM user_account WHERE id = $1",
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
