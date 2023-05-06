const authService = require("../services/authService");
const userService = require("../services/userService");
const login = async (req, res) => {
  const { email, password } = req.body;
  const token = await authService.login(email, password);
  console.log(token);
  if (!token) {
    return res.status(401).json({
      status: "error",
      message: "Invalid email or password",
    });
  }

  return res.json({
    status: "success",
    data: {
      token,
    },
  });
};

const me = async (req, res) => {
  const userId = req.userId;
  const user = await userService.getUser("id", userId);
  return res.json({
    status: "success",
    data: {
      id: user.id,
      full_name: user.full_name,
      email: user.email,
    },
  });
};

const register = async (req, res) => {
  const { email, password, full_name } = req.body;

  if (!email || !password || !full_name) {
    return res.status(400).json({
      status: "error",
      message: "Full name, email, and password must be filled",
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      status: "error",
      message: "Password must be at least 6 characters",
    });
  }

  if (!email.includes("@") || !email.includes(".")) {
    return res.status(400).json({
      status: "error",
      message: "Email must be valid",
    });
  }
  var checkUser = await userService.getUser("email", email);
  if (checkUser) {
    return res.status(400).json({
      status: "error",
      message: "Email already registered",
    });
  }

  const user = await userService.userRegister(full_name, email, password);
  return res.status(user?.id ? 201 : 400).json({
    status: user?.id ? "success" : "error",
    message: user?.id ? "User created" : "User not created",
    data: {
      id: user?.id,
      full_name: user?.full_name,
      email: user?.email,
      created_at: user?.created_at,
      updated_at: user?.updated_at,
    },
  });
};

module.exports = {
  login,
  me,
  register,
};
