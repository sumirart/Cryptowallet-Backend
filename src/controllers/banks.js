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
};
