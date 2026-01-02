const router = require('express').Router();
const c = require('../controllers/product.controller');

router.get('/', c.getProducts).get('/:id', c.getProductById);
router.post('/', c.createProduct).put('/:id', c.updateProduct).delete('/:id', c.deleteProduct);

module.exports = router;