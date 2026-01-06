//product_service/src/route/product.route.js
const router = require('express').Router();
const controlador = require('../controller/product.controller');

router.get('/', controlador.obtenerProductos).get('/:id', controlador.obtenerProductoPorId);
router.post('/', controlador.crearProducto).put('/:id', controlador.actualizarProducto).delete('/:id', controlador.eliminarProducto);

module.exports = router;