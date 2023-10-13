const verifySignUp = require("../middleware/verifySignUp");
const controller = require("../controllers/auth.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, Content-Type, Accept"
    );
    next();
  });
  app.post('/register', [
    verifySignUp.checkDuplicateUsernameOrEmail
  ],
    function (req, res) {
      controller.signUp(req, res)
    });

  app.post("/login", function (req, res) {
    controller.signin(req, res)
  });

  app.get('/logout', function (req, res) {
    controller.signOut(req, res)
  })
}
