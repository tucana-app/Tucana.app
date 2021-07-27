"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Settings.hasOne(models.Languages, {
        onDelete: "NO ACTION",
      });

      Settings.belongsTo(models.User, {
        foreignKey: "SettingsId",
        onDelete: "NO ACTION",
      });
    }
  }
  Settings.init(
    {
      UserId: DataTypes.INTEGER,
      notificationEmail: DataTypes.BOOLEAN,
      notificationPush: DataTypes.BOOLEAN,
      notificationSMS: DataTypes.BOOLEAN,
      language: DataTypes.STRING,
      animal: DataTypes.STRING,
      cigarette: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Settings",
    }
  );
  return Settings;
};
