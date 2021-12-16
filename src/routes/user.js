const express = require("express");
const Route = express.Router();

const authorization = require("../middlewares/auth");
const userController = require("../controllers/user");

Route.get("/", authorization.authCheck, userController.getUserProfile);

module.exports = Route;
