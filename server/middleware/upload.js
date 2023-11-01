const util = require("util");
const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const __basedir = __dirname;
const fs = require("fs");

const createMulterMiddleware = (fieldName) => {
    let storage = multer.diskStorage({
        destination: (req, file, cb) => {
            let storagepath = file.fieldname;
            let uploadPath;
            if (storagepath === 'profile_pic') {
                uploadPath = 'uploads/profile';
            } else {
                uploadPath = `uploads/${storagepath}`;
            }
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

    let uploadFile = multer({
        storage: storage,
        limits: { fileSize: maxSize },
    }).single(fieldName);

    let uploadFileMiddleware = util.promisify(uploadFile);
    return uploadFileMiddleware;
};

module.exports = createMulterMiddleware;
