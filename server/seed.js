const { adminRegister } = require("./controllers/auth-controllers");

async function admin() {
  let name = process.env.ADMIN_NAME;
  let email = process.env.ADMIN_EMAIL;
  let pass = process.env.ADMIN_PASSWORD;
  await adminRegister(name, email, pass, "admin");
}

async function initSeed() {}

module.exports = initSeed;
