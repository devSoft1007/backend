const express = require('express')
const router = express.Router()
const {Auth, Profile} = require('../../controllers/index')
const {verifyToken} = require('../../utils/middleware/index')
// middleware that is specific to this router
// router.use((req, res, next) => {
//   console.log('Time: ', Date.now())
//   next()
// })

router.use('/profile', verifyToken)

// influencer login
router.post('/login', new Auth(3).validate)

// influencer registration
router.post('/register', new Auth(3).register)

// profile
router.get('/profile', new Profile(3).getProfile)
// define the about route
router.get('/followers', (req, res) => {
  res.send('20 followers')
})

module.exports = router