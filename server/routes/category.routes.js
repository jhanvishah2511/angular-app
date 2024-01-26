const controller = require('../controllers/category.controller')
module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.post('/category/create/', function (req, res) {
        controller.categoryCreate(req, res)
    })

    app.get('/category/', function (req, res) {
        controller.getCategory(req, res)
    })

    app.get('/category/image/:filename', function (req, res) {
        controller.getCategoryImage(req, res)
    })
}