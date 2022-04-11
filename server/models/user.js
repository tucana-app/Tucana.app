"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Bookings, {
        onDelete: "NO ACTION",
      });

      User.hasOne(models.Driver, {
        onDelete: "CASCADE",
      });

      User.hasMany(models.Conversation, {
        onDelete: "NO ACTION",
      });

      User.hasMany(models.Message, {
        foreignKey: "SenderId",
        onDelete: "NO ACTION",
      });

      // User.hasOne(models.Settings, {
      //   foreignKey: "SettingsId",
      //   onDelete: "NO ACTION",
      // });
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      username: DataTypes.STRING,
      biography: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
      emailConfirmed: DataTypes.BOOLEAN,
      phoneConfirmed: DataTypes.BOOLEAN,
      // SettingsId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
