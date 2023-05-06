const { Categories } = require("../models");

async function getAllCategories(id_user) {
  try {
    const categori = await Categories.findAll({
      where: {
        user_id: id_user,
      },
    });
    const result = categori.map((item) => {
      return {
        id: item.id,
        name: item.name,
        created_at: item.created_at,
        updated_at: item.updated_at,
      };
    });
    return result;
  } catch (err) {
    console.log(err);
  }
}

async function createCategory(name, id_user) {
  try {
    return Categories.create({
      name,
      user_id: id_user,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteCategory(id, id_user) {
  try {
    return Categories.destroy({
      where: {
        id,
      },
    });
  } catch {
    return false;
  }
}

async function updateCategory(id, name, id_user) {
  try {
    if (!(await isOwner(id, id_user))) {
      return false;
    }
    return Categories.update(
      {
        name,
        updated_at: new Date(),
      },
      {
        where: {
          id,
        },
      }
    );
  } catch {
    return false;
  }
}

async function isOwner(id, id_user) {
  try {
    const categori = await Categories.findOne({
      where: {
        id,
      },
    });
    return categori.user_id === id_user ? true : false;
  } catch {
    return false;
  }
}

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
};
