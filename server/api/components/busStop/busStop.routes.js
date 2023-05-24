const express = require("express");
const { getAllBusStops, getBusStop } = require("./busStop.controller");
const busStopRoute = express.Router();

busStopRoute.route("/").get(getAllBusStops);

busStopRoute.route("/:id").get(getBusStop);

module.exports = busStopRoute;
