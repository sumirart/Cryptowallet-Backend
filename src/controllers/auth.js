const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authModels = require("../models/auth");
const helper = require("../helpers/responseStandard");
const configs = require("../configs/configs");

module.exports = {
  register: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return helper.response(
        res,
        400,
        null,
        true,
        "Email dan password harus diisi!"
      );
    }

    const displayName = email.split("@")[0];

    // hash / encrypt password
    const salt = bcrypt.genSaltSync(10);
    const encryptedPassword = bcrypt.hashSync(password, salt);

    authModels
      .register(displayName, email, encryptedPassword)
      .then((result) => {
        return helper.response(res, 200, result);
      })
      .catch((error) => {
        if (error.code === "23505") {
          return helper.response(
            res,
            400,
            null,
            true,
            "Email sudah terdaftar!"
          );
        }

        return helper.response(
          res,
          400,
          null,
          true,
          "Terjadi kesalahan di server, silahkan dicoba kembali!"
        );
      });
  },
  login: (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return helper.response(
        res,
        400,
        null,
        true,
        "Email dan password harus diisi!"
      );
    }

    authModels
      .login(email)
      .then((result) => {
        // jika kosong maka belum ada user
        if (result.length < 1) {
          return helper.response(
            res,
            400,
            null,
            true,
            "Email belum terdaftar!"
          );
        }

        // cek password
        const checkPassword = bcrypt.compareSync(password, result[0].password);

        if (!checkPassword) {
          return helper.response(
            res,
            400,
            null,
            true,
            "Email / password salah!"
          );
        }

        // jika benar maka return JWT
        const { id, email, display_name } = result[0];
        const payload = {
          id,
          email,
          displayName: display_name,
        };
        const token = jwt.sign(payload, configs.jwtSecret);
        const responseResult = { ...payload, token };
        return helper.response(res, 200, responseResult);
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
