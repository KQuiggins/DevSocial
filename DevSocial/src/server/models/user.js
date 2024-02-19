import { Model } from 'sequelize';
'use strict';
export default (sequelize, DataTypes) => {
  class User extends Model {
    
    static associate(models) {
      this.hasMany(models.Post);
      this.belongsToMany(models.Chat, { through: 'users_chats' });
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