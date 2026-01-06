//product_service/src/controller/product.controller.js
const servicio = require('../service/product.service');
const manejarError = require('../util/catchasync');

exports.obtenerProductos = manejarError(async (req, res) => res.json(await servicio.obtenerTodos()));

exports.obtenerProductoPorId = manejarError(async (req, res) => {
    const producto = await servicio.obtenerPorId(req.params.id);
    if (!producto) throw new Error("Producto no encontrado");
    res.json(producto);
});

exports.crearProducto = manejarError(async (req, res) => res.status(201).json(await servicio.crear(req.body)));

exports.actualizarProducto = manejarError(async (req, res) => res.json(await servicio.actualizar(req.params.id, req.body)));

exports.eliminarProducto = manejarError(async (req, res) => res.json(await servicio.eliminar(req.params.id)));