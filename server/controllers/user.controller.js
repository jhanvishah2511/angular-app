const db = require("../models");
const User = db.user
exports.getUser = async(req,res)=>{
    try {
    const user = await User.findAll();
    if(user && user.length){
        res.send({ data:user });
    }
    }  catch (error) {
        res.status(500).send({ message: error.message });
    }
}