'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate(models) {
      // define association here
      Category.hasMany(models.Post, {foreignKey:"categoryId"})
    }
  }
  Category.init({
    name: DataTypes.STRING,
    status: DataTypes.DataTypes.ENUM('Trending', 'Popular', 'New', 'Top Rated'),
  }, {
    sequelize,
    modelName: 'Category',
    timestamps:false
  });
  return Category;
};