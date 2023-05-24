const express = require("express");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const errorHandler = require("./errors/errorHandler");
const cors = require("cors");
const AppError = require("./errors/AppError.class");
const apiRoute = require("./api/api.routes");

const app = express();

app.use(
    cors({
        methods: ["PUT", "PATCH", "GET", "POST", "DELETE"],
        origin: "*",
    })
);
app.use(morgan("dev"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))

app.use(
    mongoSanitize({
        allowDots: true,
    })
);

app.use("/api", apiRoute);

app.all("*", (req, res, next) => {
    const err = new AppError(`Cant not find ${req.originalUrl} in this server`, 404);
    return next(err);
});

app.use(errorHandler);

module.exports = app;
