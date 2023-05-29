const express = require('express')
const router = express.Router()
const {auth} = require('../../classes/auth/auth')

// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })

// influencer login
router.post('/login', new auth(3).validate)

// influencer registration
router.post('/register', new auth(3).register)

// define the home page route
router.get('/profile', (req, res) => {
  res.send('influencer profile')
})
// define the about route
router.get('/followers', (req, res) => {
  res.send('20 followers')
})

module.exports = router