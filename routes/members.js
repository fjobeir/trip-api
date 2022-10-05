var express = require('express');
var router = express.Router();
var { store } = require('../controllers/memberController')

router.post('/', store)

module.exports = router;
