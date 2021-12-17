const express = require("express");
const Route = express.Router();

// IMPORT ROUTES
const auth = require("./auth.js");
const banks = require("./banks");
const coins = require("./coins");
const market = require("./market");
const user = require("./user");
const wallet = require("./wallet");

// ROUTE PER CATEGORY
Route.use("/auth", auth);
Route.use("/banks", banks);
Route.use("/coins", coins);
Route.use("/market", market);
Route.use("/user", user);
Route.use("/wallet", wallet);

module.exports = Route;
