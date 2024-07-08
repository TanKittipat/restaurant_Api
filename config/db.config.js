require("dotenv").config();

module.exports = {
  HOST: "ep-royal-credit-a1cpvaci-pooler.ap-southeast-1.aws.neon.tech",
  USER: "default",
  PASSWORD: "KeSyblZXYh97",
  DB: "verceldb",
  dialect: "postgres",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
