const repositorio = require('../repository/user.repository');

const validarUsuario = (usuario, esCreacion = true) => {
    if ((esCreacion || usuario.nombre) && (!usuario.nombre || usuario.nombre.length < 3)) throw new Error("Nombre corto");
    if ((esCreacion || usuario.correo) && !/^\S+@\S+\.\S+$/.test(usuario.correo)) throw new Error("Email inválido");
    if ((esCreacion || usuario.cedula) && (!usuario.cedula || usuario.cedula.length < 8)) throw new Error("Cédula inválida");
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