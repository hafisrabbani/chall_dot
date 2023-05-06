"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Categories.belongsTo(models.User, {
        foreignKey: "user_id",
      });
      Categories.hasMany(models.Task, {
        foreignKey: "category_id",
      });
    }

    softDelete() {
      return this.update({ deleted_at: new Date() });
    }
  }
  Categories.init(
    {
      user_id: DataTypes.INTEGER,
      name: DataTypes.STRING,
      created_at: DataTypes.DATE,
      updated_at: DataTypes.DATE,
      deleted_at: DataTypes.DATE,
    },
    {
      paranoid: true,
      deletedAt: "deleted_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
      sequelize,
      timestamps: true,
      modelName: "Categories",
    }
  );

  Categories.addHook("beforeUpdate", (instance, options) => {
    // check if the instance is soft deleted
    if (instance.deleted_at) {
      // prevent the instance from being updated
      throw new Error("This instance is soft deleted");
    }
  });

  return Categories;
};
