'use strict';

const fs = require('fs');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.post = require('../models/post.js')(sequelize, Sequelize);
db.message = require('../models/message.js')(sequelize, Sequelize);
db.user = require('../models/user.js')(sequelize, Sequelize);

module.exports = db;
