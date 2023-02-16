'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Email)
      User.hasMany(models.Post, {foreignKey:'userId'})
      User.hasMany(models.Comment, {foreignKey:'userId'})
    }
  }
  User.init({
    name:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter your name'
        }
      }},
    phone_number:
    {
      type:DataTypes.STRING,
      validate:{
        min: 7, 
      }
    } ,
    user_plan: DataTypes.ENUM('planA', 'planB'),
  }, {
    sequelize,
    modelName: 'User',
    timestamps:false
  });
  return User;
};