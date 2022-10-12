var express = require('express');
var router = express.Router();
var { store, destroy, update, index, show } = require("../controllers/tripController")

const multer = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        var ext = file.originalname.split('.')
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '.' + ext[ext.length - 1])
    }
})
const upload = multer({ storage: storage })


router.post('/', upload.array('photo', 10), store)
router.get('/', index)
router.get('/:id', show)
router.delete('/:id', destroy)
router.put('/:id', update)

module.exports = router;