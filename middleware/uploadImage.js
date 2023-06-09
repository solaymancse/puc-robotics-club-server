const multer = require("multer");

// set storage
const storage = multer.diskStorage({
    // destination
    destination:function(req, res, cb){
        cb(null, './events/');
    },

    // filename
    filename: function(req, file, cb){
        cb(null, file.originalname);
    },
});

// upload file
const upload = multer({
    storage: storage
});

module.exports = upload.single("picture");