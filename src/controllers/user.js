const userModels = require("../models/user");
const helper = require("../helpers/responseStandard");

module.exports = {
  getUserProfile: (req, res) => {
    const { userId } = req.body;
    if (!userId) {
      return helper.response(res, 400, null, true, "User id harus diisi!");
    }

    userModels
      .getUserProfile(userId)
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
