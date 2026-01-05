const db = require("../database/index.db");

const transaction = async (fn) => {
    const client = await db.connect();
    try {
        await client.query('BEGIN');
        const result = await fn(client);
        await client.query('COMMIT');
        return result;
    } catch (e) {
        await client.query('ROLLBACK');
        throw e;
    } finally {
        client.release();
    }
};

exports.obtenerTodos = async () => (await db.query("SELECT * FROM orders")).rows;

exports.obtenerPorId = async (id) => {
    const orden = (await db.query('SELECT * FROM orders WHERE id_order = $1', [id])).rows[0];
    return orden ? { orden: orden, detalle: (await db.query('SELECT * FROM orden_detalle WHERE order_id = $1', [id])).rows } : null;
};

exports.crear = async (orden) => transaction(async (client) => {
    const newId = (await client.query('INSERT INTO orders (id_usuario, total, estado) VALUES ($1, 0, $2) RETURNING id_order', [orden.id_usuario, 'CREADA'])).rows[0].id_order;
    for (const item of orden.detalles) {
        await client.query('INSERT INTO orden_detalle (order_id, producto_id, cantidad, precio_unitario) VALUES ($1, $2, $3, $4)', [newId, item.id_producto, item.cantidad, item.precio]);
    }
    const final = (await client.query('UPDATE orders SET total = $1 WHERE id_order = $2 RETURNING *', [orden.totalCalculado || 0, newId])).rows[0];
    return { orden: final, detalle: (await client.query('SELECT * FROM orden_detalle WHERE order_id = $1', [newId])).rows };
});

exports.actualizar = async (id, data) => data.estado ? (await db.query('UPDATE orders SET estado = $1 WHERE id_order = $2 RETURNING *', [data.estado, id])).rows[0] : null;

exports.eliminar = async (id) => transaction(async (client) => {
    await client.query('DELETE FROM orden_detalle WHERE order_id = $1', [id]);
    return (await client.query('DELETE FROM orders WHERE id_order = $1 RETURNING *', [id])).rows[0];
});
