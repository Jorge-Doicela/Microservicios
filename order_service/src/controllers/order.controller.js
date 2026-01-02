const OrderService = require('../services/order.service');
const catchAsync = require('../utils/catchAsync');

exports.getOrders = catchAsync(async (req, res) => res.json(await OrderService.getAll()));
exports.getOrderById = catchAsync(async (req, res) => {
    const order = await OrderService.getById(req.params.id);
    if (!order) throw new Error("Orden no encontrada");
    res.json(order);
});

exports.createOrder = catchAsync(async (req, res) => {
    const { detalles: details, id_usuario } = req.body;
    if (!details || !details.length) throw new Error("Detalles requeridos");

    const enriched = await Promise.all(details.map(async item => {
        try {
            return { ...item, precio: (await (await fetch(`http://localhost:4002/api/products/${item.id_producto}`)).json()).precio };
        } catch (e) { throw new Error(`Producto ${item.id_producto} no encontrado`); }
    }));

    res.status(201).json({ order: await OrderService.create({ id_usuario, detalles: enriched }) });
});

exports.updateOrder = catchAsync(async (req, res) => {
    const updated = await OrderService.update(req.params.id, req.body);
    if (!updated) throw new Error("Orden no encontrada");
    res.json(updated);
});
exports.deleteOrder = catchAsync(async (req, res) => res.json({ message: "Eliminada", orden: await OrderService.delete(req.params.id) }));