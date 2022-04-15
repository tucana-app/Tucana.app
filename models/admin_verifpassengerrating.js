"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class admin_VerifPassengerRating extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      admin_VerifPassengerRating.belongsTo(models.Admin, {
        onDelete: "NO ACTION",
      });

      admin_VerifPassengerRating.belongsTo(models.PassengerRating, {
        onDelete: "NO ACTION",
      });
    }
  }
  admin_VerifPassengerRating.init(
    {
      AdminId: DataTypes.INTEGER,
      PassengerRatingId: DataTypes.INTEGER,
      accepted: DataTypes.BOOLEAN,
      comment: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "admin_VerifPassengerRating",
    }
  );
  return admin_VerifPassengerRating;
};
