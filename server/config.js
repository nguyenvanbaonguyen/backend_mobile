require("dotenv").config();

const PORT = process.env.PORT;
const HOST = process.env.HOST || "localhost";
const DEPLOY_PORT = process.env.DEPLOY_PORT || PORT;

const MONGO_HOST = process.env.MONGO_HOST || "localhost";
const MONGO_NAME = process.env.MONGO_NAME || "mobile_btl";
const MONGO_PORT = process.env.MONGO_PORT || 27017;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const REDIS_HOST = process.env.REDIS_HOST || "localhost";

const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;

const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const EMAIL_USERNAME = process.env.EMAIL_USERNAME;

module.exports = {
    HOST,
    PORT,
    MONGO_HOST,
    MONGO_NAME,
    MONGO_PORT,
    REDIS_HOST,
    JWT_REFRESH_TOKEN,
    JWT_ACCESS_TOKEN,
    EMAIL_PASSWORD,
    EMAIL_USERNAME,
    DEPLOY_PORT,
    MONGO_PASSWORD,
};
