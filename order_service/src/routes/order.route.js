const router = require('express').Router();
const c = require('../controllers/order.controller');

router.get('/', c.getOrders).get('/:id', c.getOrderById);
router.post('/', c.createOrder).put('/:id', c.updateOrder).delete('/:id', c.deleteOrder);

module.exports = router;