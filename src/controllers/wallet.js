const walletModels = require("../models/wallet");
const helper = require("../helpers/responseStandard");

module.exports = {
  getWallet: (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return helper.response(res, 400, null, true, "User id harus diisi!");
    }

    walletModels
      .getWallet(userId)
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
  topup: (req, res) => {
    const { userId, amount } = req.body;
    if (!userId || !amount) {
      return helper.response(
        res,
        400,
        null,
        true,
        "User id dan amount harus diisi!"
      );
    }

    walletModels
      .topup(userId, amount)
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
  withdraw: (req, res) => {
    const { userId, amount, bankAccountId, bankCodeId, bankAccountNumber } =
      req.body;
    if (
      !userId ||
      !amount ||
      !bankAccountId ||
      !bankCodeId ||
      !bankAccountNumber
    ) {
      return helper.response(
        res,
        400,
        null,
        true,
        "User id, amount, bank account id, bank code id dan bank account number harus diisi!"
      );
    }

    walletModels
      .withdraw(userId, amount, bankAccountId, bankCodeId, bankAccountNumber)
      .then((result) => {
        return helper.response(res, 200, result);
      })
      .catch((error) => {
        // handle error saldo kurang
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
