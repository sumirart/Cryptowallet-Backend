const express = require("express");
const Route = express.Router();

const authorization = require("../middlewares/auth");
const portfolioController = require("../controllers/portfolio");

Route.get("/", authorization.authCheck, portfolioController.getPortfolio);

module.exports = Route;
