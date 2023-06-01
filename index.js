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

  sequelize.query('CREATE DATABASE IF NOT EXISTS system-backend')
  .then(() => {
    console.log('Database created or already exists');
    // Perform further operations or start your server here
  })
  .catch(error => {
    console.error('An error occurred:', error);
    // Handle the error appropriately
  });

module.exports = app;