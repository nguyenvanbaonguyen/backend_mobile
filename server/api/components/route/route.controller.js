const { asyncWrapperMiddlewareObj } = require("../../../errors/errorWrapper");
const routeModel = require("./route.model");
const APIFeatures = require("../../modules/ApiFeatures");
const AppError = require("../../../errors/AppError.class");

const getAllRoutes = async (req, res, next) => {
    const routes = await new APIFeatures(routeModel.find(), req.query).paginate().query;
    res.status(200).json({
        data: routes,
    });
};

const getRoute = async (req, res, next) => {
    const { number } = req.params;
    if (!number) return next(new AppError("Pls provide number", 400));
    const route = await routeModel.findOne({ number });
    if (!route) return next(new AppError("Cannot find route with your number", 400));

    res.status(200).json({
        data: route,
    });
};

const allFns = { getAllRoutes, getRoute };
asyncWrapperMiddlewareObj(allFns);
module.exports = { ...allFns };
