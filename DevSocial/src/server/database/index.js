import Sequelize from 'sequelize';
import dev_config from '../config/config.js';
import loadModels from '../models/index.js'; // Assume this is now an async function


const env = process.env.NODE_ENV || 'development';
console.log('env:', env);
const config = dev_config[env];

async function initializeDb() {
    const sequelize = new Sequelize(config.database, config.username, config.password, config);
    
    // Now awaiting the asynchronous loading of models
    const models = await loadModels(sequelize);

    const db = {
        models,
        sequelize,
    };

    return db;
}

// Since we cannot export an awaited value directly, we export the function to initialize
export default initializeDb ;
