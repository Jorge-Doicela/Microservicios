const db = require("../database/index.db");

exports.getAll = async () => (await db.query("SELECT * FROM productos")).rows;
exports.getById = async (id) => (await db.query("SELECT * FROM productos WHERE id = $1", [id])).rows[0];

exports.create = async (product) => (await db.query(
    "INSERT INTO productos (nombre, descripcion, precio, stock) VALUES ($1, $2, $3, $4) RETURNING *",
    [product.nombre, product.descripcion, product.precio, product.stock]
)).rows[0];

exports.update = async (id, product) => (await db.query(
    "UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, stock = $4 WHERE id = $5 RETURNING *",
    [product.nombre, product.descripcion, product.precio, product.stock, id]
)).rows[0];

exports.delete = async (id) => (await db.query("DELETE FROM productos WHERE id = $1 RETURNING *", [id])).rows[0];
