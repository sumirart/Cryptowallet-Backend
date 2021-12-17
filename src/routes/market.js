const express = require("express");
const Route = express.Router();

const marketController = require("../controllers/market");

Route.get("/", marketController.getMarket);
Route.get("/coin/:id", marketController.getCoinInfo);

module.exports = Route;
