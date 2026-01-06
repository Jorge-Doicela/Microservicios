//order_service/src/util/catchasync.js
module.exports = (funcionControlador) => {
    return async (req, res, next) => {
        try {
            await funcionControlador(req, res, next);
        } catch (error) {
            next(error);
        }
    };
};
