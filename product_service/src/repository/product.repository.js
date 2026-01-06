//product_service/src/repository/product.repository.js
const db = require("../database/index.db");

exports.obtenerTodos = async () => (await db.query("SELECT * FROM productos")).rows;
exports.obtenerPorId = async (id) => (await db.query("SELECT * FROM productos WHERE id = $1", [id])).rows[0];

exports.crear = async (producto) => (await db.query(
    "INSERT INTO productos (nombre, precio) VALUES ($1, $2) RETURNING *",
    [producto.nombre, producto.precio]
)).rows[0];

exports.actualizar = async (id, producto) => (await db.query(
    "UPDATE productos SET nombre = $1, precio = $2 WHERE id = $3 RETURNING *",
    [producto.nombre, producto.precio, id]
)).rows[0];

exports.eliminar = async (id) => (await db.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id])).rows[0];
