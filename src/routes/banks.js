const express = require("express");
const Route = express.Router();

const banksController = require("../controllers/banks");
const authorization = require("../middlewares/auth");

Route.get("/", authorization.authCheck, banksController.getBankAccount);
Route.post("/", authorization.authCheck, banksController.addBankAccount);
Route.get("/codes", authorization.authCheck, banksController.getBankCodes);

module.exports = Route;
