const AppError = require("./AppError.class");

const handleCastErrorDB = (err) => {
    const message = `Invalid ${err.path}: ${err.value}`;
    return new AppError(message, 400);
};

const handleDuplicateDB = (err) => {
    const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0];
    const message = `Duplicate field value ${value}, pls use another value`;
    return new AppError(message, 400);
};

const handleValidationErrorDB = (err) => {
    const errorsMessage = Object.entries(err.errors)
        .map(([key, properties]) => properties.message)
        .join(" || ");

    return new AppError(errorsMessage, 400);
};

const handleSyntaxError = (err) => {
    return new AppError(err.message, 400);
};

const handleJWTError = () => new AppError("Invalid token. Pls login again", 401);

const handleJWTExpiredError = () => new AppError("Your token has expired! Pls login again", 401);

const sendErrorDev = (err, res) => {
    const { statusCode = 500, status = "err", message = "", stack } = err;
    res.status(statusCode).json({
        status,
        message,
        stack,
        err,
    });
};

const sendErrorProd = (err, res) => {
    const { statusCode = 500, status = "err", message = "" } = err;

    if (err.isOperational) {
        res.status(statusCode).json({
            status,
            message,
        });
    } else {
        console.log("Error", err);
        res.status(500).json({
            status: "error",
            message: "Something went very wrong",
        });
    }
};

const errorHandler = (err, req, res, next) => {
    if (process.env.NODE_ENV === "development") {
        sendErrorDev(err, res);
    } else if (process.env.NODE_ENV === "production") {
        let error = { ...err };
        if (err.name === "CastError") error = handleCastErrorDB(err);
        if (err.code === 11000) error = handleDuplicateDB(err);
        if (err.name === "ValidationError") error = handleValidationErrorDB(err);
        if (err.name === "JsonWebTokenError") error = handleJWTError();
        if (err.name === "TokenExpiredError") error = handleJWTExpiredError();
        if (err.name === "SyntaxError") error = handleSyntaxError(err);
        if (err.message && !error.message) error.message = err.message;

        sendErrorProd(error, res);
    }
};

module.exports = errorHandler;
