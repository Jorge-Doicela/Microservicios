const db = require("../database/index.db");

exports.obtenerTodos = async () => (await db.query("SELECT * FROM productos")).rows;
exports.obtenerPorId = async (id) => (await db.query("SELECT * FROM productos WHERE id = $1", [id])).rows[0];

exports.crear = async (producto) => (await db.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [producto.nombre, producto.descripcion, producto.precio, producto.stock]
)).rows[0];

exports.actualizar = async (id, producto) => (await db.query(
    "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *",
    [producto.nombre, producto.descripcion, producto.precio, producto.stock, id]
)).rows[0];

exports.eliminar = async (id) => (await db.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id])).rows[0];
