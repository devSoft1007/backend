require('dotenv').config()

const express = require('express')
const app = express()

const PORT = 3000
const {influencerRoutes} = require('./routes/routes')
const {sequelize} = require('./DBclient/DBclient')


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// v1 api routes
// app.use('/v1', routes);


app.use('/api/influencer', influencerRoutes)

  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  })

// Check if the database exists
sequelize.queryInterface.showAllSchemas()
  .then(schemas => {
    if (!schemas.includes('system-database')) {
      // Create the database if it doesn't exist
      return sequelize.queryInterface.createSchema('system-database');
    }
  })
  .then(() => {
    console.log('Database created or already exists');
    // Perform further operations or start your server here
  })
  .catch(error => {
    console.error('An error occurred:', error);
    // Handle the error appropriately
  });

  process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
  }).on('uncaughtException', err => {
    console.error(err, 'Uncaught Exception thrown');
    process.exit(1);
  });  

module.exports = app;