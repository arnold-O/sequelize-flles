'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
 
    static associate(models) {
      // define association here
      Category.hasMany(models.Post, {foreignKey:'categoryId'})
      
    }
  }
  Category.init({
    name: DataTypes.STRING,
    status: {

      type:DataTypes.ENUM('Trending', 'Popular', 'New', 'Top Rated'),
      allowNull : false, 
      defaultValue : 'New',
      validate: {
        isIn: { 
          args: [['Trending', 'Popular', 'New', 'Top Rated']],
          msg: "Wrong status, please select from one of the pre-defined"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Category',
    timestamps:false
  });
  return Category;
};