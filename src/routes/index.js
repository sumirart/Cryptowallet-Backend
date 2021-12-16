const express = require("express");
const Route = express.Router();

// IMPORT ROUTES
const auth = require("./auth.js");
const banks = require("./banks");
const coins = require("./coins");
const user = require("./user");

// ROUTE PER CATEGORY
Route.use("/auth", auth);
Route.use("/banks", banks);
Route.use("/coins", coins);
Route.use("/user", user);

module.exports = Route;
