'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tour extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Tour.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    des: DataTypes.TEXT,
    image: DataTypes.BLOB,
    date: DataTypes.STRING,
    quantityMax: DataTypes.INTEGER,
    quantityCurrent: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tour',
  });
  return Tour;
};