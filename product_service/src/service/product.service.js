//product_service/src/service/product.service.js
const repositorio = require('../repository/product.repository');

const validarProducto = (producto, esActualizacion = false) => {
    if (esActualizacion && !producto.nombre && producto.precio === undefined) return;
    if ((!esActualizacion || producto.nombre) && !producto.nombre) throw new Error("Nombre obligatorio");
    if ((!esActualizacion || producto.precio !== undefined) && (typeof producto.precio !== 'number' || producto.precio <= 0)) throw new Error("Precio inválido");
    if ((!esActualizacion || producto.precio !== undefined) && producto.precio < 10) throw new Error("Regla de Negocio: El precio debe ser mayor a $10");
};

exports.obtenerTodos = repositorio.obtenerTodos;
exports.obtenerPorId = repositorio.obtenerPorId;
exports.crear = async (producto) => {
    validarProducto(producto);
    return await repositorio.crear(producto);
};

exports.actualizar = async (id, data) => {
    validarProducto(data, true);
    return await repositorio.actualizar(id, data);
};

exports.eliminar = repositorio.eliminar;