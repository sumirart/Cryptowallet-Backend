const bankModels = require("../models/banks");
const helpers = require("../helpers/responseStandard");

module.exports = {
  getBankCodes: (req, res) => {
    bankModels
      .getBankCodes()
      .then((result) => {
        return helpers.response(res, 200, result);
      })
      .catch((error) => {
        return helpers.response(
          res,
          500,
          null,
          true,
          "Terjadi kesalahan di server, silahkan dicoba kembali."
        );
      });
  },
  getBankAccount: (req, res) => {
    // const { userId } = req.body // DELETE SOON
    const userId = req.get("User-Id");
    if (!userId) {
      return helpers.response(res, 400, null, true, "User id harus diisi!");
    }

    bankModels
      .getBankAccount(userId)
      .then((result) => {
        return helpers.response(res, 200, result);
      })
      .catch((error) => {
        return helpers.response(
          res,
          500,
          null,
          true,
          "Terjadi kesalahan di server, silahkan dicoba kembali."
        );
      });
  },
  addBankAccount: (req, res) => {
    const { userId, accountNumber, accountName, bankId } = req.body;
    if (!userId || !accountNumber || !accountName || !bankId) {
      return helpers.response(
        res,
        400,
        null,
        true,
        "User id, account number, account name, dan bank id harus diisi!"
      );
    }

    bankModels
      .addBankAccount(userId, accountNumber, accountName, bankId)
      .then((result) => {
        return helpers.response(res, 200, result);
      })
      .catch((error) => {
        return helpers.response(
          res,
          500,
          null,
          true,
          "Terjadi kesalahan di server, silahkan dicoba kembali."
        );
      });
  },
};
