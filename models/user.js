'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Record, { foreignKey: 'userId' });
      User.hasMany(models.Image, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      weight: DataTypes.FLOAT,
      waistline: DataTypes.FLOAT,
      nowWeight: DataTypes.FLOAT,
      nowWaistline: DataTypes.FLOAT,
      weightDiff: DataTypes.FLOAT,
      waistlineDiff: DataTypes.FLOAT,
    },
    {
      sequelize,
      modelName: 'User',
      tableName: 'Users',
      underscored: true,
    },
  );
  return User;
};
