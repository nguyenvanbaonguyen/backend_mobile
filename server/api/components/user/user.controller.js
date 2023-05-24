const FactoryCRUD = require("../../modules/FactoryCRUD");
const { asyncWrapperMiddlewareObj } = require("../../../errors/errorWrapper");
const UserModel = require("./user.model");

const getMe = async (req, res, next) => {
    res.status(200).json({
        status: "success",
        data: req.user,
    });
};

const userFactory = new FactoryCRUD(UserModel);

const getUser = userFactory.getOne();

const updateMe = userFactory.updateOne({ bans: ["password"] });

const allFns = { getMe, updateMe, getUser };
asyncWrapperMiddlewareObj(allFns);
module.exports = { ...allFns };
