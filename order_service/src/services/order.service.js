const repo = require('../repositories/order.repository');

const calculateTotal = (order) => {
    if (!order.detalles) return order;
    order.totalCalculado = order.detalles.reduce((acc, item) => {
        if (!item.cantidad || item.cantidad <= 0) throw new Error("Cantidad inválida");
        return acc + (item.cantidad * item.precio);
    }, 0);
    return order;
};

exports.getAll = repo.getAll;
exports.getById = repo.getById;
exports.create = (order) => {
    if (!order.id_usuario || !order.detalles || !order.detalles.length) throw new Error("Datos incompletos");
    return repo.create(calculateTotal(order));
};
exports.delete = repo.delete;