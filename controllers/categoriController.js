const categoriService = require("../services/categoriService");

const getAll = async (req, res) => {
  const userId = req.userId;
  const categories = await categoriService.getAllCategoriesService(userId);
  return res.status(200).json({
    status: "success",
    data: {
      categories,
    },
  });
};

const create = async (req, res) => {
  const userId = req.userId;
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "Name must be filled",
    });
  }

  const category = await categoriService.createCategoryService(name, userId);
  if (category[0] === 0) {
    return res.status(400).json({
      status: "error",
      message: "Failed to create category",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      category,
    },
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const userId = req.userId;
  if (!name) {
    return res.status(400).json({
      status: "error",
      message: "Name must be filled",
    });
  }

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Id must be filled",
    });
  }

  const category = await categoriService.updateCategoryService(
    id,
    name,
    userId
  );
  console.log(category);
  if (!category) {
    return res.status(400).json({
      status: "error",
      message: "Failed to update category",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      message: "Category updated successfully",
    },
  });
};

const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Id must be filled",
    });
  }

  const category = await categoriService.deleteCategoryService(id, userId);
  if (!category) {
    return res.status(400).json({
      status: "error",
      message: "Failed to delete category",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      message: "Category deleted successfully",
    },
  });
};

module.exports = {
  getAll,
  create,
  update,
  deleteCategory,
};
