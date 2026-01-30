//order_service/src/controller/order.controller.js
const servicio = require('../service/order.service');
const manejarError = require('../util/catchasync');

exports.obtenerOrdenes = manejarError(async (req, res) => res.json(await servicio.obtenerTodos()));
exports.obtenerOrdenPorId = manejarError(async (req, res) => {
    const orden = await servicio.obtenerPorId(req.params.id);
    if (!orden) throw new Error("Orden no encontrada");
    res.json(orden);
});

exports.crearOrden = manejarError(async (req, res) => {
    try {
        const userServiceUrl = process.env.USER_SERVICE_URL || 'http://localhost:4001';
        const usuarioResponse = await fetch(`${userServiceUrl}/api/user/${req.body.usuario_id}`);
        if (!usuarioResponse.ok) throw new Error("Usuario no encontrado en microservicio de usuarios");
        const usuario = await usuarioResponse.json();
        if (!usuario) throw new Error("Usuario no existe");
    } catch (e) { throw new Error("Usuario no encontrado"); }

    try {
        const productServiceUrl = process.env.PRODUCT_SERVICE_URL || 'http://localhost:4002';
        const productoResponse = await fetch(`${productServiceUrl}/api/product/${req.body.producto_id}`);
        if (!productoResponse.ok) throw new Error("Producto no encontrado en microservicio de productos");
        const producto = await productoResponse.json();
        if (!producto) throw new Error("Producto no existe");
    } catch (e) { throw new Error("Producto no encontrado"); }

    res.status(201).json(await servicio.crear(req.body));
});

exports.actualizarOrden = manejarError(async (req, res) => {
    const updated = await servicio.actualizar(req.params.id, req.body);
    if (!updated) throw new Error("Orden no encontrada");
    res.json(updated);
});
exports.eliminarOrden = manejarError(async (req, res) => res.json({ message: "Eliminada", orden: await servicio.eliminar(req.params.id) }));