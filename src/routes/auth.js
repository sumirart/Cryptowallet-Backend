const express = require("express");
const Route = express.Router();

const authController = require("../controllers/auth");

Route.post("/register", authController.register);
Route.post("/login", authController.login);

module.exports = Route;
