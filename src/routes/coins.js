const express = require("express");
const Route = express.Router();

const authorization = require("../middlewares/auth");
const coinsController = require("../controllers/coins");

Route.get("/", authorization.authCheck, coinsController.getCoins);

module.exports = Route;
