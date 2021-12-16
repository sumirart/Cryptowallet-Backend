const express = require("express");
const Route = express.Router();

const banksController = require("../controllers/banks");

Route.get("/", banksController.getBankCodes);

module.exports = Route;
