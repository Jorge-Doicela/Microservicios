const servicio = require('../service/order.service');
const manejarError = require('../util/catchasync');

exports.obtenerOrdenes = manejarError(async (req, res) => res.json(await servicio.obtenerTodos()));
exports.obtenerOrdenPorId = manejarError(async (req, res) => {
    const orden = await servicio.obtenerPorId(req.params.id);
    if (!orden) throw new Error("Orden no encontrada");
    res.json(orden);
});

exports.crearOrden = manejarError(async (req, res) => {
    const { detalles: listaProductos, id_usuario } = req.body;
    if (!listaProductos || !listaProductos.length) throw new Error("Detalles requeridos");

    const productosConPrecio = await Promise.all(listaProductos.map(async productoDetalle => {
        try {
            return { ...productoDetalle, precio: (await (await fetch(`http://localhost:4002/api/product/${productoDetalle.id_producto}`)).json()).precio };
        } catch (e) { throw new Error(`Producto ${productoDetalle.id_producto} no encontrado`); }
    }));

    res.status(201).json({ order: await servicio.crear({ id_usuario, detalles: productosConPrecio }) });
});

exports.actualizarOrden = manejarError(async (req, res) => {
    const updated = await servicio.actualizar(req.params.id, req.body);
    if (!updated) throw new Error("Orden no encontrada");
    res.json(updated);
});
exports.eliminarOrden = manejarError(async (req, res) => res.json({ message: "Eliminada", orden: await servicio.eliminar(req.params.id) }));