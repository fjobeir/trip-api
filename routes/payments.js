var express = require('express');
var router = express.Router();
var { store } = require('../controllers/paymentController')

router.post('/', store)
// router.get('/:id', show)
// router.get('/', index)
// router.delete('/:id', destroy)
// router.put('/:id', update)

module.exports = router;
