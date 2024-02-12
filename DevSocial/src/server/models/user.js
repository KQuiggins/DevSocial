import { Model } from 'sequelize';
'use strict';
export default (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      this.hasMany(models.Post);
    }
  }
  User.init({
    avatar: DataTypes.STRING,
    username: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};