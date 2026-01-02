const db = require("../database/index.db");

exports.getAll = async () => (await db.query("SELECT * FROM usuarios")).rows;
exports.getById = async (id) => (await db.query("SELECT * FROM usuarios WHERE id_usuario = $1", [id])).rows[0];

exports.create = async (user) => (await db.query(
    "INSERT INTO usuarios (cedula, nombre, correo, telefono) VALUES ($1, $2, $3, $4) RETURNING *",
    [user.cedula, user.nombre, user.correo, user.telefono]
)).rows[0];

exports.update = async (id, user) => (await db.query(
    "UPDATE usuarios SET cedula = $1, nombre = $2, correo = $3, telefono = $4 WHERE id_usuario = $5 RETURNING *",
    [user.cedula, user.nombre, user.correo, user.telefono, id]
)).rows[0];

exports.delete = async (id) => (await db.query("DELETE FROM usuarios WHERE id_usuario = $1 RETURNING *", [id])).rows[0];
