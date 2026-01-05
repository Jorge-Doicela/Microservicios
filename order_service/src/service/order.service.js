const repositorio = require('../repository/order.repository');

const calcularTotal = (orden) => {
    if (!orden.detalles) return orden;
    orden.totalCalculado = orden.detalles.reduce((totalAcumulado, producto) => {
        if (!producto.cantidad || producto.cantidad <= 0) throw new Error("Cantidad inválida");
        return totalAcumulado + (producto.cantidad * producto.precio);
    }, 0);
    return orden;
};

exports.obtenerTodos = repositorio.obtenerTodos;
exports.obtenerPorId = repositorio.obtenerPorId;
exports.crear = (orden) => {
    if (!orden.id_usuario || !orden.detalles || !orden.detalles.length) throw new Error("Datos incompletos");
    return repositorio.crear(calcularTotal(orden));
};
exports.actualizar = repositorio.actualizar;
exports.eliminar = repositorio.eliminar;