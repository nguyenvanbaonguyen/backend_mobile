const AppError = require("../../../errors/AppError.class");
const { asyncWrapperMiddlewareObj } = require("../../../errors/errorWrapper");
const busStopModel = require("./busStop.model");

const getAllBusStops = async (req, res, next) => {
    const busStops = await busStopModel.find();
    res.status(200).json({
        data: busStops,
    });
};

const getBusStop = async (req, res, next) => {
    const { id } = req.params;
    const busStop = await busStopModel.findById(id);

    if (!busStop) return next(new AppError("Cannot find route with your input", 400));
    res.status(200).json({
        data: busStop,
    });
};

const allFns = { getAllBusStops, getBusStop };
asyncWrapperMiddlewareObj(allFns);
module.exports = { ...allFns };
