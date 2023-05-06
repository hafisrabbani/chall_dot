const { getUserBy, createUser } = require("../repositories/userRepository");
const bcrypt = require("bcrypt");
async function getUser(key, value) {
  return getUserBy(key, value);
}

async function userRegister(full_name, email, password) {
  var pass = bcrypt.hashSync(password, 10);
  return createUser(full_name, email, pass);
}

module.exports = {
  getUser,
  userRegister,
};
