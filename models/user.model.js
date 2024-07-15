const { DataType, DataTypes } = require("sequelize");
const sequelize = require("./db");

// define DB Schema
const User = sequelize.define("user", {
  // ค่า default ของ sequelize จะสร้าง primary key ให้อยู่แล้ว
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userPassword: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = User;
