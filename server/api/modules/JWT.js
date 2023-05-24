const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const { JWT_REFRESH_TOKEN, JWT_ACCESS_TOKEN } = require("../../config");
const { USER_TOKEN_REFRESH_EXPIRE, USER_TOKEN_ACCESS_EXPIRE } = require("../../constants");
const { asyncWrapperThrow } = require("../../errors/errorWrapper");

class JWT {}

JWT.verifyRefeshToken = async (token) => {
    return await promisify(jwt.verify)(token, JWT_REFRESH_TOKEN);
};

JWT.verifyAccessToken = async (token) => {
    return await promisify(jwt.verify)(token, JWT_ACCESS_TOKEN);
};

JWT.signRefreshToken = async (data) => {
    const refreshToken = await promisify(jwt.sign)(data, JWT_REFRESH_TOKEN, { expiresIn: USER_TOKEN_REFRESH_EXPIRE });
    return { refreshToken, expiredFreshToken: Date.now() + USER_TOKEN_REFRESH_EXPIRE };
};

JWT.signAccessToken = async (data) => {
    const accessToken = await promisify(jwt.sign)(data, JWT_ACCESS_TOKEN, { expiresIn: USER_TOKEN_ACCESS_EXPIRE });
    return { accessToken, expiredAccessToken: Date.now() + USER_TOKEN_ACCESS_EXPIRE };
};

JWT.signToken = async (data) => {
    const [accessToken, refreshToken] = await Promise.all([JWT.signAccessToken(data), JWT.signRefreshToken(data)]);
    return { ...accessToken, ...refreshToken };
};

Object.keys(JWT).forEach((key) => (JWT[key] = asyncWrapperThrow(JWT[key])));

module.exports = JWT;
