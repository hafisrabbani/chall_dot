const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { getUserBy } = require("../repositories/userRepository");

async function login(email, password) {
  const user = await getUserBy("email", email);
  if (!user) {
    return false;
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return false;
  }

  const token = jwt.sign(
    {
      id: user.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    }
  );
  return token;
}

function verifyToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

module.exports = {
  login,
  verifyToken,
};
