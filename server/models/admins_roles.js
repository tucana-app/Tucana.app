"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admins_roles extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admins_roles.belongsTo(models.User, {
        foreignKey: "adminId",
      });
      admins_roles.belongsTo(models.Role, {
        foreignKey: "roleId",
      });
    }
  }
  admins_roles.init(
    {
      adminId: DataTypes.INTEGER,
      roleId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "admins_roles",
    }
  );
  return admins_roles;
};
