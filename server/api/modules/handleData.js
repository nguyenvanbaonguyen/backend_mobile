const AppError = require("../../errors/AppError.class");

const handleData = (data, options) => {
    if (typeof data === "string") data = JSON.parse(data);
    if (typeof data !== "object") return;
    const keys = Object.keys(data);
    if (options.requires && Array.isArray(options.requires)) {
        options.requires.forEach((require) => {
            if (!keys.includes(require)) throw new AppError(`${require} is required`);
        });
    }
    if (options.bans && Array.isArray(options.bans)) {
        keys.forEach((key) => {
            if (options.bans.includes(key)) delete data[key];
        });
    }
    return data;
};

module.exports = handleData;
