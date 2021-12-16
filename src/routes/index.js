const express = require("express");
const Route = express.Router();

// IMPORT ROUTES
const banks = require("./banks");

// ROUTE PER CATEGORY
Route.use("/banks", banks);

module.exports = Route;

// /api/v1
// /api/v1/banks
// /api/v1/banks/bank2
