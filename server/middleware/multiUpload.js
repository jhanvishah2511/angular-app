const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const __basedir = __dirname;
const fs = require("fs");
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = 'uploads/documents';
        // Create the directory if it doesn't exist
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, +Date.now() + "_" + file?.originalname);
    },
});

let multiUpload = multer({
    storage: storage,
    limits: { fileSize: maxSize },
}).array('docs');

let uploadFileMiddleware = util.promisify(multiUpload);
module.exports = uploadFileMiddleware;
