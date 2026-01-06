//user_service/src/repository/user.repository.js
const db = require("../database/index.db");

exports.obtenerTodos = async () => (await db.query("SELECT * FROM usuarios")).rows;
exports.obtenerPorId = async (id) => (await db.query("SELECT * FROM usuarios WHERE id = $1", [id])).rows[0];

exports.crear = async (usuario) => (await db.query(
    "INSERT INTO usuarios (nombre, email) VALUES ($1, $2) RETURNING *",
    [usuario.nombre, usuario.email]
)).rows[0];

exports.actualizar = async (id, usuario) => (await db.query(
    "UPDATE usuarios SET nombre = $1, email = $2 WHERE id = $3 RETURNING *",
    [usuario.nombre, usuario.email, id]
)).rows[0];

exports.eliminar = async (id) => (await db.query("DELETE FROM usuarios WHERE id = $1 RETURNING *", [id])).rows[0];
