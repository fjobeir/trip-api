var express = require('express');
var router = express.Router();
var { store, show, index, destroy, update, login } = require('../controllers/memberController')
var isAuthenticated = require('../middlewares/isAuthenticated')
var isAuthorized = require('../middlewares/isAuthorized')

const multer = require('multer');
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

router.get('/:id', show)
router.get('/', index)
router.delete('/:id', isAuthenticated, isAuthorized, destroy)
router.put('/:id', isAuthenticated, isAuthorized, update)
router.post('/login', login)

module.exports = router;
