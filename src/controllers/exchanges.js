const exchangeModels = require("../models/exchanges");
const helper = require("../helpers/responseStandard");
const marketController = require("./market");
const { response } = require("../helpers/responseStandard");

module.exports = {
  buy: async (req, res) => {
    const { userId, coinId, amount } = req.body;
    if (!userId || !coinId || !amount) {
      return helper.response(
        res,
        400,
        null,
        true,
        "User id, coin id dan amount harus diisi!"
      );
    }

    // cek harga terbaru
    let price = 0;
    await marketController
      .getCurrentPrice(req, res, coinId)
      .then((response) => {
        price = response * amount;
      })
      .catch((error) => {
        return helper.response(res, 500, null, true, error);
      });

    exchangeModels
      .buy(userId, coinId, amount, price)
      .then((response) => {
        return helper.response(res, 200, response);
      })
      .catch((error) => {
        if (error && error.code === "23514") {
          return helper.response(res, 400, null, true, "Saldo kurang!");
        }

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
