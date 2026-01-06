//order_service/src/service/order.service.js
const repositorio = require('../repository/order.repository');

exports.obtenerTodos = repositorio.obtenerTodos;
exports.obtenerPorId = repositorio.obtenerPorId;

exports.crear = async (orden) => {
    if (!orden.usuario_id || !orden.producto_id || !orden.cantidad) throw new Error("Datos incompletos");
    if (orden.cantidad <= 0) throw new Error("Cantidad inválida");
    if (orden.cantidad > 10) throw new Error("Regla de Negocio: Máximo 10 unidades por producto");
    return await repositorio.crear(orden);
};

exports.actualizar = async (id, data) => {
    if (data.cantidad && data.cantidad > 10) throw new Error("Regla de Negocio: Máximo 10 unidades por producto");
    return await repositorio.actualizar(id, data);
};

exports.eliminar = repositorio.eliminar;