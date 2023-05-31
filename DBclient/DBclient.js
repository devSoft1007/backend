const Sequelize = require('sequelize');

const database = process.env.DB_DATABASE
const user = process.env.DB_USER
const password = process.env.DB_PASSWORD
const dialect = process.env.DB_DIALACT
const host = process.env.DB_HOST

const sequelize = new Sequelize(
  database, 
  user, 
  password, 
  {
  host: host,
  dialect: dialect,
  // Additional configuration options
});

module.exports = {
    sequelize
}
 