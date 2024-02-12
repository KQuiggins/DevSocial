import { Model } from 'sequelize';
'use strict';

export default (sequelize, DataTypes) => {
  class Post extends Model {
    
    static associate(models) {
      this.belongsTo(models.User);
    }
  }
  Post.init({
    text: DataTypes.TEXT,
    userID: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};
