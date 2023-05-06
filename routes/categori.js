const express = require("express");
const router = express.Router();
const {
  getAll,
  create,
  update,
  deleteCategory,
} = require("../controllers/categoriController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/", authMiddleware, getAll);
router.post("/create", authMiddleware, create);
router.put("/update/:id", authMiddleware, update);
router.delete("/delete/:id", authMiddleware, deleteCategory);

module.exports = router;
