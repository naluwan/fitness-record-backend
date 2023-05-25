'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Record extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 設定關聯
      // 一個紀錄資料只屬於一個運動分類
      Record.belongsTo(models.SportCategory, { foreignKey: 'sportCategoryId' });

      Record.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Record.init(
    {
      date: DataTypes.DATE,
      weight: DataTypes.FLOAT,
      waistline: DataTypes.FLOAT,
      description: DataTypes.TEXT,
      images: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Record',
      tableName: 'Records',
      underscored: true,
    },
  );
  return Record;
};
