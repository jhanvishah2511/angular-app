const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const __basedir = __dirname;
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file?.originalname);
    },
});

let uploadFile = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).single("profile_pic");

let uploadFileMiddleware = util.promisify(uploadFile);
module.exports = uploadFileMiddleware;
