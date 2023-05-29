const Sequelize = require('sequelize');
const sequelize = new Sequelize('platform', 'root', 'root', {
  host: '127.0.0.1',
  dialect: 'mysql',
  // Additional configuration options
});

module.exports = {
    sequelize
}
 