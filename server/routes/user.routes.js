const controller = require("../controllers/user.controller");
const verifySignUp = require("../middleware/verifySignUp");
module.exports = function (app) {

    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        );
        next();
    });
    app.get('/user', function (req, res) {
        controller.getUser(req, res)
    })
    app.get('/user/:id', function (req, res) {
        controller.getUserById(req, res)
    })
    app.post('/user/edit/:id', function (req, res) {
        controller.userEdit(req, res)
    })
    app.delete('/user/:id', function (req, res) {
        controller.userDelete(req, res)
    })
    app.post('/user/create/', [
        verifySignUp.checkDuplicateUsernameOrEmail
    ], function (req, res) {
        controller.userCreate(req, res)
    })
    app.post('/user/verify/', function (req, res) {
        controller.userVerify(req, res)
    })
    app.get('/user/profile-pic/:filename', function (req, res) {
        controller.userProfilePic(req, res)
    })
}