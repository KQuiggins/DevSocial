import Sequelize from 'sequelize';
import configFile from '../config/index.cjs';
import models from '../models/index.js';

const env = process.env.NODE_ENV || 'development';
const config = configFile[env];

const sequelize = new Sequelize(config.database, config.username,
    config.password, config);

const db = {
    models: models(sequelize),
    sequelize,
};

export default db;