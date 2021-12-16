const jwt = require("jsonwebtoken");
const helpers = require("../helpers/responseStandard");
const configs = require("../configs/configs");

module.exports = {
  authCheck: (req, res, next) => {
    let token = req.headers.authorization;

    if (!token) {
      return helpers.response(
        res,
        403,
        null,
        true,
        "Mohon login terlebih dahulu!"
      );
    }

    // pengecekan token
    token = token.split(" ")[1];
    jwt.verify(token, configs.jwtSecret, (error, result) => {
      if (error && error.name === "JsonWebTokenError") {
        return helpers.response(
          res,
          403,
          null,
          true,
          "Token error atau invalid!"
        );
      } else {
        // validasi apakah user id sama dengan yang ada di dalam token
        if (req.body.userId) {
          if (req.body.userId != result.id) {
            return helpers.response(
              res,
              403,
              null,
              true,
              "User id tidak sesuai dengan token!"
            );
          }
        }
        next();
      }
    });
  },
};
