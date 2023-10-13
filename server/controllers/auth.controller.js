const db = require("../models");
const config = require("../config/auth.config");
const bcrypt = require("bcryptjs");
const User = db.user
const jwt = require("jsonwebtoken");
const mailConfigure = require("../constants/mail");
const fs = require("fs");
const util = require("util");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const token = Math.random().toString(36);
exports.signUp = async (req, res) => {
    try {
        const user = await User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            verificationToken: token,
            verifyStatus: false
        });
        this.sendMail(req.body);
        if (user) {
            res.send({ message: "User registered successfully!", data: user });
        }
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: mailConfigure.USER,
        pass: mailConfigure.PASSWORD,
        clientId: mailConfigure.CLIENT_ID,
        clientSecret: mailConfigure.CLIENT_SECRET,
        refreshToken: mailConfigure.REFRESH_TOKEN,
    },
});
// Read the HTML email template
const readFile = util.promisify(fs.readFile);
const emailTemplatePath = "./emailTemplates/RegisteredUser.html";
exports.sendMail = async (data) => {
    const template = await readFile(emailTemplatePath, "utf8");
    const compiledTemplate = handlebars.compile(template);
    const link = `${mailConfigure.FRONT_URL}verify/${data.email}/${token}`;
    const dynamicData = {
      FIRSTNAME: data.firstName,
      LASTNAME: data.lastName,
      FRONT_URL: link,
    };
    // Replace placeholders with dynamic data
    const html = compiledTemplate(dynamicData);
    const mailConfigurations = {
      from: mailConfigure.USER,
      to: data.email,
      subject: "User Registered",
      html: html,
    };
    transporter.sendMail(mailConfigurations, function (error, info) {
      if (error) throw Error(error);
      console.log("Email Sent Successfully");
    });
}

exports.signin = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email,
            },
        });
        if (!user) {
            return res.status(400).send({ message: "User Email Not found." });
        } else {
            const passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );
            if (!passwordIsValid) {
                return res.status(401).send({ message: "Invalid Password!" });
            } else {
                const verify = await User.findOne({
                    where: {
                        email: req.body.email,
                    },
                });
                if (verify.verifyStatus) {
                    const token = jwt.sign({ id: user.id },
                        config.secret,
                        {
                            algorithm: 'HS256',
                            allowInsecureKeySizes: true,
                        }
                    );
                    user.token = token;
                    return res.status(200).send({
                        data: user, token, message: "Logged In Successfully"
                    });
                } else {
                    return res.status(401).send({ message: "Email Not Verified" });
                }
            }

        }
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

exports.signOut = async (req, res) => {
    try {
        const token = '';
        return res.status(200).send({
            token, message: "You're Logged Out."
        });
    } catch (error) {
        return res.status(500).send({ message: error.message });
    }
}