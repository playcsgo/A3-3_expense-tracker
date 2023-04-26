const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')

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

// Login page
router.get('/login', (req, res) => {
  res.render('login')
})



module.exports = router