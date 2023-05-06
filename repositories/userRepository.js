const { User } = require("../models");

async function getUserBy(key, value) {
  return User.findOne({
    where: {
      [key]: value,
    },
  });
}

async function createUser(full_name, email, password) {
  try {
    return User.create({
      full_name,
      email,
      password,
    });
  } catch {
    return false;
  }
}

module.exports = {
  getUserBy,
  createUser,
};
