const asyncWrapperThrow =
    (fn) =>
    async (...args) =>
        fn(...args).catch((err) => {
            throw err;
        });

const asyncWrapperConsole =
    (fn) =>
    async (...args) => {
        return fn(...args).catch((err) => {
            console.log(err);
        });
    };

const asyncWrapperMiddleware = (fn) => async (req, res, next) => fn(req, res, next).catch(next);

const asyncWrapperMiddlewareObj = (obj) => {
    Object.keys(obj).forEach((el) => {
        obj[el] = asyncWrapperMiddleware(obj[el]);
    });
};

module.exports = { asyncWrapperConsole, asyncWrapperThrow, asyncWrapperMiddleware, asyncWrapperMiddlewareObj };
