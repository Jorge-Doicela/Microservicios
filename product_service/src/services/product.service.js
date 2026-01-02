const repo = require('../repositories/product.repository');

const validateProduct = (product, isUpdate = false) => {
    if (isUpdate && !product.nombre && !product.descripcion && product.precio === undefined && product.stock === undefined) return;
    if ((!isUpdate || product.nombre) && !product.nombre) throw new Error("Nombre obligatorio");
    if ((!isUpdate || product.precio !== undefined) && (typeof product.precio !== 'number' || product.precio <= 0)) throw new Error("Precio inválido");
    if ((!isUpdate || product.stock !== undefined) && (typeof product.stock !== 'number' || product.stock < 0)) throw new Error("Stock inválido");
};

exports.getAll = repo.getAll;
exports.getById = repo.getById;
exports.create = (product) => (validateProduct(product), repo.create(product));
exports.update = (id, data) => (validateProduct(data, true), repo.update(id, data));
exports.delete = repo.delete;