const db = require("../models");
const User = db.user;
const bcrypt = require("bcryptjs");
const mailConfigure = require("../constants/mail");
const fs = require("fs");
const util = require("util");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const jwt = require("jsonwebtoken");
exports.getUser = async (req, res) => {
  try {
    const user = await User.findAll();
    if (user && user.length) {
      res.send({ data: user });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      res.send({ data: user });
    } else {
      res.send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};
exports.userEdit = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (user) {
      res.send({ message: "User Updated Successfully" });
    } else {
      res.status(400).send({ message: "User Not Updated" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.userDelete = async (req, res) => {
  try {
    const id = req.params.id;
    if (id) {
      const user = await User.destroy({
        where: {
          id: id,
        },
      });
      if (user) {
        res.send({ message: "User Deleted Successfully" });
      } else {
        res.status(400).send({ message: "User Not Updated" });
      }
    } else {
      res.status(400).send({ message: "User Not Found" });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

exports.userCreate = async (req, res) => {
  try {
    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      verificationToken: token,
      verifyStatus: false
    });
    if (user) {
      this.sendMail(req.body);
      res.send({ message: "User created successfully! Email sent to user", data: user });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

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
const emailTemplatePath = "./emailTemplates/NewUserCreate.html";
const token = Math.random().toString(36);

exports.sendMail = async (data) => {
  const template = await readFile(emailTemplatePath, "utf8");
  const compiledTemplate = handlebars.compile(template);
  const link = `${mailConfigure.FRONT_URL}verify/${data.email}/${token}`;
  const dynamicData = {
    FIRSTNAME: data.firstName,
    LASTNAME: data.lastName,
    EMAIL: data.email,
    PASSWORD: data.password,
    FRONT_URL: link,
  };
  // Replace placeholders with dynamic data
  const html = compiledTemplate(dynamicData);
  const mailConfigurations = {
    from: mailConfigure.USER,
    to: data.email,
    subject: "User Registered by Admin",
    html: html,
  };
  transporter.sendMail(mailConfigurations, function (error, info) {
    if (error) throw Error(error);
    console.log("Email Sent Successfully");
  });
};

exports.userVerify = async (req, res) => {
  try {
    
    const email = req.body.email;
    const token = req.body.token;
    if (email && token) {
      const verify = await User.findOne({
        where: {
          email: email,
          verificationToken: token
        }
      })
      if (verify) {
        const update = await User.update(
          {
            verificationToken: null,
            verifyStatus: 1
          },
          {
            where:{
              email:email
            }
          })
          if(update){
            res.send({ message: 'User Verified Successfully' });
          }
      } else {
        res.status(400).send({ message: 'Link not found..Please try again' });
      }
    } else {
      res.status(400).send({ message: 'Not able to verify email' });
    }
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
}
