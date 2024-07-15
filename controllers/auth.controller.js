const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;
const Role = db.Role;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { Op } = require("sequelize");

// หลักการ one way encryption คือ นำ encrypt ของสิ่งที่กรอกมาเทียบกัน

// Resgister a new user
exports.signup = async (req, res) => {
  const { username, email, userPassword } = req.body;
  if (!username || !email || !userPassword) {
    res.status(400).send({
      message: "Please provide all required fields",
    });
    return;
  }

  //   Prepare user data
  const newUser = {
    username: username,
    email: email,
    userPassword: bcrypt.hashSync(userPassword, 8),
  };

  //   Save user in the DB
  await User.create(newUser)
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({ where: { roleName: { [Op.or]: req.body.roles } } }).then(
          (roles) => {
            user.setRoles(roles).then(() => {
              res.send({ message: "User registered successfully!" });
            });
          }
        );
      } else {
        // Set default role to user
        user.setRoles([1]).then(() => {
          res.send({ message: "User registered successfully!" });
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something error occured while registering a new user!",
      });
    });
};
