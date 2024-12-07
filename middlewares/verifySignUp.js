const User = require("../models/user.model");
const Role = require("../models/role.model");
const { Op } = require("sequelize");

checkDuplicateUsernameOrEmail = async (req, res, next) => {
  // check username
  await User.findOne({
    where: {
      username: req.body.username,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: "Failed! Username already in use!",
      });
      return;
    }
    // check email
    User.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email already in use!",
        });
        return;
      }
      next();
      //   middleware จะมี next เพราะต้องส่งไปให้ซอฟต์แวร์ตัวต่อไป
    });
  });
};

// Check roles are valid
checkRolesExisted = async (req, res, next) => {
  if (req.body.roles) {
    Role.findAll({ where: { roleName: { [Op.or]: req.body.roles } } }).then(
      (roles) => {
        if (roles.length != req.body.roles.length) {
          res.status(400).send({
            message: "Failed! Role does not exist.",
          });
          return;
        }
        next();
      }
    );
  } else {
    next();
  }
};

// verify sign-up
const verifySignUp = {
  checkRolesExisted,
  checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
