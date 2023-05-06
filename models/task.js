"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    static associate(models) {
      Task.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Task.belongsTo(models.Categories, {
        foreignKey: "category_id",
        as: "category",
      });
    }
  }
  Task.init(
    {
      user_id: DataTypes.INTEGER,
      category_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      sequelize,
      timestamps: true,
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      modelName: "Task",
    }
  );
  return Task;
};
