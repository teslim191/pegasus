const express = require('express')
const { registerPage, registerUser, loginPage, loginUser } = require('../controllers/authController')
const { ensureGuest } = require('../middleware/auth')
const router = express()

// register page route
router.get('/register', ensureGuest, registerPage)
// register route
router.post('/register', registerUser)
// login page route
router.get('/login', ensureGuest, loginPage)
// login route
router.post('/login', loginUser)



module.exports = router