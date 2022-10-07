var express = require('express');
var router = express.Router();
var { store, destroy, update, index, show } = require("../controllers/tripController")


router.post('/', store)
router.get('/',index) 
router.get('/:id',show)
router.delete('/:id',destroy)
router.put('/:id',update)

module.exports = router;