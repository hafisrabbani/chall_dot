const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAll,
  create,
  update,
  deleteTask,
} = require("../controllers/taskController");
router.get("/", authMiddleware, getAll);
router.post("/create", authMiddleware, create);
router.put("/update/:id", authMiddleware, update);
router.delete("/delete/:id", authMiddleware, deleteTask);
module.exports = router;
