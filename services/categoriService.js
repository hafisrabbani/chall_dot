const {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
} = require("../repositories/categoriRepository");

async function getAllCategoriesService(id_user) {
  const categories = await getAllCategories(id_user);
  return categories;
}

async function createCategoryService(name, id_user) {
  const category = await createCategory(name, id_user);
  return category;
}

async function deleteCategoryService(id, id_user) {
  return deleteCategory(id, id_user);
}

async function updateCategoryService(id, name, id_user) {
  return updateCategory(id, name, id_user);
}

module.exports = {
  getAllCategoriesService,
  createCategoryService,
  deleteCategoryService,
  updateCategoryService,
};
