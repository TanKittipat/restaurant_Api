const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
// const req = require("express/lib/request");
// const res = require("express/lib/response");
const User = db.User;

// verify token
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  //   1st verify
  if (!token) {
    return res.status(403).send({
      message: "No token provided!",
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!",
      });
    }
    req.userId = decoded.id;
    // decoded มี id เพราะในไฟล์ auth.controller ส่วน signin เราใส่ object ที่มี attribute id ใน jwt.sign
    next();
  });
};

// IsAdmin?
isAdmin = (req, res, next) => {
  // SELECT roles.roleName FROM roles,users,user_roles WHERE users.id = user_roles.userId AND roles.id = user_roles.roleId AND users.id = "id";
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName === "admin") {
          next();
          return;
        }
      }
      res.status(401).send({
        message: "Require Admin Role!",
      });
    });
  });
};

// IsMod?
isMod = (req, res, next) => {
  // SELECT roles.roleName FROM roles,users,user_roles WHERE users.id = user_roles.userId AND roles.id = user_roles.roleId AND users.id = "id";
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].roleName === "moderator") {
          next();
          return;
        }
      }
      res.status(401).send({
        message: "Require Moderator Role!",
      });
    });
  });
};

// isAdminOrMod
isAdminOrMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (
          roles[i].roleName === "moderator" ||
          roles[i].roleName === "admin"
        ) {
          next();
          return;
        }
      }
      res.status(401).send({
        message: "Require Admin or Moderator Role!",
      });
    });
  });
};

const authJwt = {
  verifyToken,
  isAdmin,
  isMod,
  isAdminOrMod,
};
module.exports = authJwt;
