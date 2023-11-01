
const createMulterMiddleware = require("../middleware/upload");
const db = require("../models");
const Category = db.category;
exports.categoryCreate = async (req, res) => {
    try {
        const fieldName = "categoryImage"; // Specify the field name dynamically
        const uploadFile = createMulterMiddleware(fieldName);

        // Call the dynamic Multer middleware
        await uploadFile(req, res);
        if (req.file === undefined) {
            res.status(500).send({ message: 'Please select category image' });
        } else {
            const category = await Category.create({
                categoryName: req.body.categoryName,
                categoryStatus: req.body.categoryStatus,
                categoryImage: req.file.filename
            });
            if (category) {
                res.send({ message: "Category created successfully", data: category });
            } else {
                res.status(400).send({ message: 'Something went wrong' });
            }
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}