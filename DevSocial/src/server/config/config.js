// Require the dotenv package
require('dotenv').config();

// Now you can access environment variables via process.env
console.log(process.env.YOUR_ENV_VARIABLE);

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

// Use module.exports to export the config object
module.exports = dev_config;
