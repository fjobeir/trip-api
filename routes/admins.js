var express = require('express');
var router = express.Router();
var { store, show, index, destroy, update, login } = require('../controllers/adminController')
var isAuthenticated = require('../middlewares/isAuthenticated')
var isAdmin = require('../middlewares/isAdmin')

// just to see the clone

router.post('/', isAuthenticated, isAdmin, store)
router.get('/:id', show)
router.get('/', index)
router.delete('/:id', isAuthenticated, isAdmin, destroy)
router.put('/:id', isAuthenticated, isAdmin, update)
router.post('/login', login)

module.exports = router;
