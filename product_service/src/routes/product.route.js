const router = require('express').Router();
const productsController = require('../controllers/product.controller');

router.get('/', productsController.getProducts).get('/:id', productsController.getProductById);
router.post('/', productsController.createProduct).put('/:id', productsController.updateProduct).delete('/:id', productsController.deleteProduct);

module.exports = router;