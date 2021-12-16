const coinsModels = require("../models/coins");
const helper = require("../helpers/responseStandard");

module.exports = {
  getCoins: (req, res) => {
    coinsModels
      .getCoins()
      .then((result) => {
        return helper.response(res, 200, result);
      })
      .catch((error) => {
        return helper.response(
          res,
          500,
          null,
          true,
          "Terjadi kesalahan di server, silahkan dicoba kembali!"
        );
      });
  },
};
