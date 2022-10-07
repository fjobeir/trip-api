var express = require('express');
var router = express.Router();
var { store, show, index, destroy, update, login } = require('../controllers/memberController')

router.post('/', store)
router.get('/:id', show)
router.get('/', index)
router.delete('/:id', destroy)
router.put('/:id', update)
router.post('/login', login)

module.exports = router;
