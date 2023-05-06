const taskService = require("../services/taskService");

const getAll = async (req, res) => {
  const userId = req.userId;
  const tasks = await taskService.getAllTasksService(userId);
  return res.status(200).json({
    status: "success",
    data: {
      tasks,
    },
  });
};

const create = async (req, res) => {
  const userId = req.userId;
  const { category_id, task_name, description } = req.body;
  const dataCreate = {
    user_id: userId,
    category_id,
    name: task_name,
    description,
  };

  if (!category_id || !task_name || !description) {
    return res.status(400).json({
      status: "error",
      message: "All field must be filled",
    });
  }
  const task = await taskService.createTaskService(dataCreate);

  if (!task) {
    return res.status(400).json({
      status: "error",
      message: "Failed to create task",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      task,
    },
  });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { category_id, task_name, description } = req.body;

  const userId = req.userId;
  if (!category_id || !task_name || !description) {
    return res.status(400).json({
      status: "error",
      message: "All field must be filled",
    });
  }
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Id must be filled",
    });
  }
  const dataUpdate = {
    category_id,
    name: task_name,
    description,
  };

  const task = await taskService.updateTaskService(id, dataUpdate, userId);
  if (!task) {
    return res.status(400).json({
      status: "error",
      message: "Failed to update task",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      message: "Task updated",
    },
  });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Id must be filled",
    });
  }
  const task = await taskService.deleteTaskService(id, userId);
  if (!task) {
    return res.status(400).json({
      status: "error",
      message: "Failed to delete task",
    });
  }

  return res.status(200).json({
    status: "success",
    data: {
      message: "Task deleted",
    },
  });
};

module.exports = {
  getAll,
  create,
  update,
  deleteTask,
};
