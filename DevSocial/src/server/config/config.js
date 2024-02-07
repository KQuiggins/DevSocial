// Assuming the file name is config.js or config.mjs based on your project setup
import dotenv from 'dotenv';
dotenv.config();

const development = {
  username: "root",
  password: "password123",
  database: "graphbook_dev",
  host: "localhost",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const production = {
  host: process.env.HOST,
  username: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: false,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const dev_config = {
  development,
  production
};

export default dev_config;
