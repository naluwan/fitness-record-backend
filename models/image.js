'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.Record, { foreignKey: 'recordId' });
      Image.belongsTo(models.User, { foreignKey: 'userId' });
    }
  }
  Image.init(
    {
      recordId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      url: DataTypes.TEXT,
      deleteHash: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Image',
      tableName: 'Images',
      underscored: true,
    },
  );
  return Image;
};
