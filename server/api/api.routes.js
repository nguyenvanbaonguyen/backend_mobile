const express = require("express");
const authRoute = require("./components/auth/auth.routes");
const busStopRoute = require("./components/busStop/busStop.routes");
const routeRoutes = require("./components/route/route.routes");
const userRoute = require("./components/user/user.routes");
const apiRoute = express.Router();

apiRoute.use("/auth", authRoute);

apiRoute.use("/user", userRoute);

apiRoute.use("/routes", routeRoutes);

apiRoute.use("/bus-stops", busStopRoute);

module.exports = apiRoute;
