const servicio = require('../service/user.service');
const manejarError = require('../util/catchasync');

exports.obtenerUsuarios = manejarError(async (req, res) => res.json(await servicio.obtenerTodos()));

exports.obtenerUsuarioPorId = manejarError(async (req, res) => {
    const usuario = await servicio.obtenerPorId(req.params.id);
    if (!usuario) throw new Error("Usuario no encontrado");
    res.json(usuario);
});

exports.crearUsuario = manejarError(async (req, res) => res.status(201).json(await servicio.crear(req.body)));

exports.actualizarUsuario = manejarError(async (req, res) => res.json(await servicio.actualizar(req.params.id, req.body)));

exports.eliminarUsuario = manejarError(async (req, res) => res.json(await servicio.eliminar(req.params.id)));