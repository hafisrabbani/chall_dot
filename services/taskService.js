const taskRepository = require("../repositories/taskRepository");

async function createTaskService(data) {
  const task = await taskRepository.createTask(data);
  return task;
}

async function getAllTasksService(id_user) {
  const tasks = await taskRepository.getAllTasks(id_user);
  return tasks;
}

async function updateTaskService(id, data) {
  const task = await taskRepository.updateTask(id, data);
  return task;
}

async function deleteTaskService(id) {
  const task = await taskRepository.deleteTask(id);
  return task;
}

module.exports = {
  createTaskService,
  getAllTasksService,
  updateTaskService,
  deleteTaskService,
};
