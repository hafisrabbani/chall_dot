const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const port = process.env.APP_PORT;
const authRoutes = require("./routes/auth");
const categoriRoutes = require("./routes/categori");
const taskRoutes = require("./routes/task");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/auth", authRoutes);
app.use("/categori", categoriRoutes);
app.use("/task", taskRoutes);

app.listen(port, () => {
  console.log("Server started on port " + port);
});

module.exports = { app };
