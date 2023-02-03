'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate(models) {
      // define association here
    }
  }
  Category.init({
    name: DataTypes.STRING,
    categoryImage: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
    timestamps:false
  });
  return Category;
};