const { Task, Categories } = require("../models");

async function getAllTasks(id_user) {
  try {
    const test = await Task.findAll({
      where: {
        user_id: id_user,
      },
      include: [
        {
          model: Categories,
          as: "category",
          attributes: ["id", "name"],
        },
      ],
      attributes: ["id", "name", "description"],
    });
    return test;
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function createTask(data) {
  try {
    return Task.create({
      ...data,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function updateTask(id, data) {
  try {
    return Task.update(
      {
        ...data,
      },
      {
        where: {
          id,
        },
      }
    );
  } catch (err) {
    console.log(err);
    return false;
  }
}

async function deleteTask(id) {
  try {
    return Task.destroy({
      where: {
        id,
      },
    });
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
