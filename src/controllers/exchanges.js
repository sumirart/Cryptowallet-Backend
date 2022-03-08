const exchangeModels = require("../models/exchanges");
const helper = require("../helpers/responseStandard");
const marketController = require("./market");

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

    // cek harga terbaru dan masukan ke variable
    let price = 0;
    await marketController
      .getCurrentPrice(res, coinId)
      .then((response) => {
        price = response * amount;
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

    exchangeModels
      .buy(userId, coinId, amount, price)
      .then((response) => {
        return helper.response(res, 200, response);
      })
      .catch((error) => {
        // pengecekan jika error kurang saldo
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
  sell: async (req, res) => {
    const { userId, coinId, amount } = req.body;
    if (!userId || !coinId || !amount) {
      // bernilai false
      return helper.response(
        res,
        400,
        null,
        true,
        "User id, coin id dan amount harus diisi!"
      );
    }

    // cek harga terbaru dan masukan ke variable
    let price = 0;
    await marketController
      .getCurrentPrice(res, coinId)
      .then((response) => {
        price = response * amount;
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

    exchangeModels
      .sell(userId, coinId, amount, price)
      .then((response) => {
        return helper.response(res, 200, response);
      })
      .catch((error) => {
        // pengecekan jika error kurang saldo
        if (error && error.code === "23514") {
          return helper.response(res, 400, null, true, "Jumlah koin kurang!");
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
  getExchangesHistory: (req, res) => {
    // const { userId } = req.body // DELETE SOON
    const userId = req.get("User-Id");
    if (!userId) {
      return helper.response(res, 400, null, true, "User id harus diisi!");
    }

    exchangeModels
      .getExchangesHistory(userId)
      .then((response) => {
        return helper.response(res, 200, response);
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
