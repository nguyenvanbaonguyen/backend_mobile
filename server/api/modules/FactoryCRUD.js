const APIFeatures = require("./ApiFeatures");
const AppError = require("../../errors/AppError.class");
const handleData = require("./handleData");

class FactoryCRUD {
    constructor(Model) {
        this.Model = Model;
    }
}

FactoryCRUD.prototype.getOne = function () {
    return async (req, res, next) => {
        const data = await this.Model.findById(req.params.id);
        if (!data) return next(new AppError(`ID ${id} is not exists`, 400));
        if (data?.status === "deactivate")
            return next(new AppError(`This data was deactivated, pls contact with admin to unblock that`, 403));
        res.status(200).json({
            status: "success",
            data: {
                data,
            },
        });
    };
};

FactoryCRUD.prototype.getAll = function (options) {
    return async (req, res, next) => {
        let additionRequest = {};
        if (options?.base === "userID") additionRequest[options?.base] = req.params?.id || req.user?._id;
        else if (options?.base) additionRequest[options?.base] = req.params?.id;
        if (options?.query) additionRequest = { ...additionRequest, ...options?.query };
        const data = await new APIFeatures(this.Model.find(additionRequest), req.query).all().query;
        const totalItems = await new APIFeatures(this.Model.find(additionRequest), req.query).filter().query.count();
        res.status(200).json({
            status: "success",
            data: {
                data,
                totalItems,
            },
        });
    };
};

FactoryCRUD.prototype.updateOne = function (options) {
    return async (req, res, next) => {
        console.log(req.body, 3);
        let data = req.body;
        const id = req.params.id || req.user.id;
        const result = await this.Model.findByIdAndUpdate(id, handleData(data, options), { new: true });
        res.status(200).json({
            status: "success",
            data: result,
        });
    };
};

FactoryCRUD.prototype.updateOneWithoutForm = function (options) {
    return async (req, res, next) => {
        const data = req.body;
        const id = req.params.id;
        const result = await this.Model.findByIdAndUpdate(id, handleData(data, options), { new: true });
        res.status(200).json({
            status: "success",
            data: result,
        });
    };
};

FactoryCRUD.prototype.deleteOne = function () {
    return async (req, res, next) => {
        const data = await this.Model.findByIdAndDelete(req.params.id);
        if (!data) return next(new AppError(`No data found with that ID`, 404));
        res.status(204).json({
            status: "success",
            data: null,
        });
    };
};

FactoryCRUD.prototype.allowCorrectHost = function () {
    return async (req, res, next) => {
        if (req.user.role === "admin") return next();
        const item = await this.Model.findById(req.params.id);
        if (!item) return next(new AppError("No item with that ID", 404));
        if (item.status === "deactivate")
            return next(new AppError("Your item was deactivated, pls contact to admin to activate", 403));
        if ((await item.userID.toString()) == (await req.user._id.toString())) return next();
        return next(new AppError("You dont have permission with this pet", 403));
    };
};

module.exports = FactoryCRUD;
