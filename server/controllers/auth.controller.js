const db = require("../models");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const User = db.user
const jwt = require("jsonwebtoken");
exports.signUp = async (req, res) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
        });
        if(user){
            res.send({ message: "User registered successfully!", data:user });
        }
    }  catch (error) {
        res.status(500).send({ message: error.message });
    }
}

exports.signin = async(req,res)=>{
    try{
        const user = await User.findOne({
            where: {
              email: req.body.email,
            },
        });
        if(!user){
            return res.status(400).send({ message: "User Email Not found." });
        }else{
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!"});
            }else{
                const token = jwt.sign({ id: user.id },
                    config.secret,
                    {
                     algorithm: 'HS256',
                     allowInsecureKeySizes: true,
                    }
                );
                user.token = token;
                return res.status(200).send({
                    data:user, token, message:"Logged In Successfully"
                });
            }

        }
    }catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.signOut = async(req,res)=>{
    try{
        const token = '';
        return res.status(200).send({
            token, message:"You're Logged Out."
        });
    }catch (error) {
        return res.status(500).send({ message: error.message });
    }
}