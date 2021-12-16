const express = require("express");
const Route = express.Router();

// IMPORT ROUTES
const banks = require("./banks");
const auth = require("./auth.js");

// ROUTE PER CATEGORY
Route.use("/banks", banks);
Route.use("/auth", auth);

module.exports = Route;
