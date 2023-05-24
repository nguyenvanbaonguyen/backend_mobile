const AppError = require("../../../errors/AppError.class");
const { asyncWrapperMiddlewareObj } = require("../../../errors/errorWrapper");
const JWT = require("../../modules/JWT");
const userModel = require("../user/user.model");

const register = async (req, res, next) => {
    const { password, phone, email } = req.body;

    const isExists = await userModel.findOne({ email });
    if (isExists) return next(new AppError(`Email ${dataUser.email} has been registed before`, 409));

    const user = new userModel({ password, phone, email });
    const savedUser = await user.save();
    savedUser.password = undefined;

    res.status(200).json({
        data: savedUser,
        status: "success",
    });
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email }).select("password");
    if (!user) return next(new AppError("User is not register", 404));

    const isCorrectPassword = await user.checkPassword(password);
    if (!isCorrectPassword) return next(new AppError("Your password is wrong", 401));

    const token = await JWT.signToken({ id: user._id });

    res.status(200).json({
        status: "success",
        data: token,
    });
};

const sendRefreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    if (!refreshToken) return next(new AppError("Pls send refreshToken", 400));

    const { userId } = await JWT.verifyRefeshToken(refreshToken);
    const token = await JWT.signToken({ id: userId });

    res.status(200).json({
        status: "success",
        token,
    });
};

const authUser = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer"))
        token = req.headers.authorization.split(" ")[1];

    if (!token) return next(new AppError("Pls login to get access this token", 401));

    const { id } = await JWT.verifyAccessToken(token);
    const user = await userModel.findById(id);
    if (!user) return next(new AppError("The token belonging to user does no longer exist", 400));

    req.user = user;
    next();
};

const allFns = { register, login, sendRefreshToken, authUser };

asyncWrapperMiddlewareObj(allFns);

module.exports = { ...allFns };
