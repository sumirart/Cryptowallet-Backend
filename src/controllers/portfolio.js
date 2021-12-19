const portfolioModels = require("../models/portfolio");
const helper = require("../helpers/responseStandard");

module.exports = {
  getPortfolio: (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return helper.response(res, 400, null, true, "User id harus diisi!");
    }

    portfolioModels
      .getPortfolio(userId)
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
