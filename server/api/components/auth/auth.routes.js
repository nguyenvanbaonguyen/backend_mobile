const express = require("express");

const { register, login, sendRefreshToken } = require("./auth.controller");

const authRoute = express.Router();

authRoute.post("/register", register);

authRoute.post("/login", login);

authRoute.post("/refresh-token", sendRefreshToken);

module.exports = authRoute;
