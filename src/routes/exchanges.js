const express = require("express");
const Route = express.Router();

const authorization = require("../middlewares/auth");
const exchangeController = require("../controllers/exchanges");

Route.post("/buy", authorization.authCheck, exchangeController.buy);

module.exports = Route;
