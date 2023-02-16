'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.hasMany(models.Comment, {foreignKey:'postId'}),
      Post.belongsTo(models.User, {foreignKey:'userId'})
    }
  }
  Post.init({
    name: DataTypes.STRING,
    content: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    timestamps:false,
    sequelize,
    modelName: 'Post',
  });
  return Post;
};