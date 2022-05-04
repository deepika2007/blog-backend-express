const path = require('path')
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        var docPath = `./uploads` || './images';
        cb(null, docPath)
    },
    filename: function (req, file, cb) {
        var type = file.mimetype.split('/');
        cb(null, Date.now() + path.extname(file.originalname));
    }
})
var upload = multer({
    storage,
    fileFilter: function (req, file, callback) {
        // if (file.mimetype == 'image/png' || file.mimetype == 'image/jpg') {
            callback(null,file, true)
        // }
        // else {
        //     console.log('only jpg and png')
        //     callback(null, false)
        // }
    }
})
module.exports = upload