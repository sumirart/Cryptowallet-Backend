const express = require("express");
const Route = express.Router();

const authorization = require("../middlewares/auth");
const walletController = require("../controllers/wallet");

Route.get("/", authorization.authCheck, walletController.getWallet);
Route.post("/topup", authorization.authCheck, walletController.topup);
Route.post("/withdraw", authorization.authCheck, walletController.withdraw);

module.exports = Route;
