const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getAll, create } = require("../controllers/taskController");
router.get("/", authMiddleware, getAll);
router.post("/create", authMiddleware, create);

module.exports = router;
