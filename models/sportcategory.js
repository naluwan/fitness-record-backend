'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SportCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 設定關聯
      // hasMany: 一個運動類別可以有很多個紀錄資料
      SportCategory.hasMany(models.Record, { foreignKey: 'sportCategoryId' });
    }
  }
  SportCategory.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'SportCategory',
      tableName: 'SportCategories',
      underscored: true,
    },
  );
  return SportCategory;
};
