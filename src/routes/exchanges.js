const express = require("express");
const Route = express.Router();

const authorization = require("../middlewares/auth");
const exchangeController = require("../controllers/exchanges");

Route.get("/", authorization.authCheck, exchangeController.getExchangesHistory);
Route.post("/buy", authorization.authCheck, exchangeController.buy);
Route.post("/sell", authorization.authCheck, exchangeController.sell);

module.exports = Route;
