const ProductService = require('../services/product.service');
const catchAsync = require('../utils/catchAsync');

exports.getProducts = catchAsync(async (req, res) => res.json(await ProductService.getAll()));

exports.getProductById = catchAsync(async (req, res) => {
    const product = await ProductService.getById(req.params.id);
    if (!product) throw new Error("Producto no encontrado");
    res.json(product);
});

exports.createProduct = catchAsync(async (req, res) => res.status(201).json(await ProductService.create(req.body)));

exports.updateProduct = catchAsync(async (req, res) => res.json(await ProductService.update(req.params.id, req.body)));

exports.deleteProduct = catchAsync(async (req, res) => res.json(await ProductService.delete(req.params.id)));