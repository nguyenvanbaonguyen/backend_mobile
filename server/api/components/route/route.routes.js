const express = require("express");
const { getAllRoutes, getRoute } = require("./route.controller");
const routeRoutes = express.Router();

routeRoutes.route("/").get(getAllRoutes);

routeRoutes.route("/:number").get(getRoute);

module.exports = routeRoutes;

