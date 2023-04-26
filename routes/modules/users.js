const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')
const passport = require('passport')

// Resgister Page
router.get('/register', (req, res) => {
  res.render('register')
})

// Resigster Function
router.post('/register', (req, res) => {
  console.log(req.body)
  User.create(req.body)
    .then(() => {
      res.redirect('/users/login')
    })
})

// Login Page
router.get('/login', (req, res) => {
  res.render('login')
})

// Login Function
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

// logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/users/login')
  })
})

module.exports = router