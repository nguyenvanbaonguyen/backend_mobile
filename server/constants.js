const USER_TOKEN_REFRESH_EXPIRE = 10 * 24 * 60 * 60 * 1000;
const USER_TOKEN_ACCESS_EXPIRE = 10 * 60 * 60 * 1000;

const MORGAN_FORMAT =
    ':remote-addr - :remote-user [:date[iso]] ":method :url HTTP/:http-version" :status :res[content-length] ":referrer" ":user-agent" - :response-time ms';

module.exports = { USER_TOKEN_REFRESH_EXPIRE, USER_TOKEN_ACCESS_EXPIRE, MORGAN_FORMAT };
