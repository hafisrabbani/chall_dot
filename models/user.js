"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Task, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Categories, {
        foreignKey: "user_id",
      });
    }
  }
  User.init(
    {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      full_name: DataTypes.STRING,
      updated_at: DataTypes.DATE,
      created_at: DataTypes.DATE,
    },
    {
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
