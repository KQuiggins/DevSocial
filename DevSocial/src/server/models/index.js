import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

export default async (sequelize) => {
  let db = {};

  // Correctly handle Windows paths by removing the leading slash if necessary
  const modelsDirectory = path.dirname(new URL(import.meta.url).pathname).replace(/^\/([A-Za-z]:\/)/, '$1');
  const modelFiles = fs.readdirSync(modelsDirectory).filter(
    file => file !== 'index.js' && file.endsWith('.js')
  );

  // Dynamically import each model file
  for (const file of modelFiles) {
    const modelPath = path.resolve(modelsDirectory, file);
    const imported = await import(`file://${modelPath}`);
    const model = (await imported).default(sequelize, Sequelize);
    db[model.name] = model;
  }

  // Associate models if applicable
  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });

  return db;
};
