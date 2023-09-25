const db = require("../models");
const User = db.user;

checkDuplicateUsernameOrEmail = async(req,res,next) => {
    try {
        let user = await User.findOne({
            where: {
                email: req.body.email
            }
        });
        if (user) {
            return res.status(400).send({
                message: "Email is already in use!"
            });
        }
        next();
    } catch (error) {
        return res.status(500).send({
            message: "Unable to validate!"
        });
    }
}
const verifySignUp = {
    checkDuplicateUsernameOrEmail,
};
  
module.exports = verifySignUp;