const db = require("../database/index.db");

exports.getAll = async () => (await db.query("SELECT * FROM orders")).rows;

exports.getById = async (id) => {
    const order = (await db.query('SELECT * FROM orders WHERE id_order = $1', [id])).rows[0];
    if (!order) return null;
    return { orden: order, detalle: (await db.query('SELECT * FROM orden_detalle WHERE order_id = $1', [id])).rows };
};

const transaction = async (fn) => {
    try {
        await db.query('BEGIN');
        const r = await fn();
        await db.query('COMMIT');
        return r;
    } catch (e) {
        await db.query('ROLLBACK');
        throw e;
    }
};

exports.create = async (order) => transaction(async () => {
    const newId = (await db.query(
        'INSERT INTO orders (id_usuario, total, estado) VALUES ($1, 0, $2) RETURNING id_order',
        [order.id_usuario, 'CREADA']
    )).rows[0].id_order;

    for (const item of order.detalles) await db.query(
        'INSERT INTO orden_detalle (order_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)',
        [newId, item.id_producto, item.cantidad, item.precio]
    );

    const final = (await db.query(
        'UPDATE orders SET total = $1 WHERE id_order = $2 RETURNING *',
        [order.totalCalculado || 0, newId]
    )).rows[0];

    return { orden: final, detalle: (await db.query('SELECT * FROM orden_detalle WHERE order_id = $1', [newId])).rows };
});

exports.update = async (id, data) => data.estado ? (await db.query('UPDATE orders SET estado = $1 WHERE id_order = $2 RETURNING *', [data.estado, id])).rows[0] : null;

exports.delete = async (id) => (
    await db.query('DELETE FROM orden_detalle WHERE order_id = $1', [id]),
    (await db.query('DELETE FROM orders WHERE id_order = $1 RETURNING *', [id])).rows[0]
);
