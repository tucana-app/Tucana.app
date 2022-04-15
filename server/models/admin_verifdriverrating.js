"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin_VerifDriverRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin_VerifDriverRating.belongsTo(models.Admin, {
        onDelete: "NO ACTION",
      });

      admin_VerifDriverRating.belongsTo(models.DriverRating, {
        onDelete: "NO ACTION",
      });
    }
  }
  admin_VerifDriverRating.init(
    {
      AdminId: DataTypes.INTEGER,
      DriverRatingId: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin_VerifDriverRating",
    }
  );
  return admin_VerifDriverRating;
};
