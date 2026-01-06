//user_service/src/service/user.service.js
const repositorio = require('../repository/user.repository');

const validarUsuario = (usuario, esCreacion = true) => {
    if ((esCreacion || usuario.nombre) && (!usuario.nombre || usuario.nombre.length < 3)) throw new Error("Nombre corto");
    if ((esCreacion || usuario.nombre) && usuario.nombre.toLowerCase() === 'admin') throw new Error("Regla de Negocio: El nombre 'admin' está prohibido");
    if ((esCreacion || usuario.email) && !/^\S+@\S+\.\S+$/.test(usuario.email)) throw new Error("Email inválido");
};

exports.obtenerTodos = repositorio.obtenerTodos;
exports.obtenerPorId = repositorio.obtenerPorId;
exports.crear = async (usuario) => {
    validarUsuario(usuario);
    return await repositorio.crear(usuario);
};

exports.actualizar = async (id, data) => {
    validarUsuario(data, false);
    return await repositorio.actualizar(id, data);
};

exports.eliminar = repositorio.eliminar;