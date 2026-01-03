const router = require('express').Router();
const ordersController = require('../controllers/order.controller');

router.get('/', ordersController.getOrders).get('/:id', ordersController.getOrderById);
router.post('/', ordersController.createOrder).put('/:id', ordersController.updateOrder).delete('/:id', ordersController.deleteOrder);

module.exports = router;