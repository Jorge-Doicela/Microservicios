const router = require('express').Router();
const c = require('../controllers/users.controller');

router.get('/', c.getUsers).get('/:id', c.getUserById);
router.post('/', c.createUser).put('/:id', c.updateUser).delete('/:id', c.deleteUser);

module.exports = router;