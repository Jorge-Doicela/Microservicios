const repo = require('../repositories/users.repository');

const validateUser = (user, create = true) => {
    if ((create || user.nombre) && (!user.nombre || user.nombre.length < 3)) throw new Error("Nombre corto");
    if ((create || user.correo) && !/^\S+@\S+\.\S+$/.test(user.correo)) throw new Error("Email inválido");
    if ((create || user.cedula) && (!user.cedula || user.cedula.length < 8)) throw new Error("Cédula inválida");
};

exports.getAll = repo.getAll;
exports.getById = repo.getById;
exports.create = (user) => (validateUser(user), repo.create(user));
exports.update = (id, data) => (validateUser(data, false), repo.update(id, data));
exports.delete = repo.delete;