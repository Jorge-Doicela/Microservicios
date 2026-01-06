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
        const usuario = await (await fetch(`http://localhost:4001/api/user/${req.body.usuario_id}`)).json();
        if (!usuario) throw new Error("Usuario no existe");
    } catch (e) { throw new Error("Usuario no encontrado"); }

    try {
        const producto = await (await fetch(`http://localhost:4002/api/product/${req.body.producto_id}`)).json();
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