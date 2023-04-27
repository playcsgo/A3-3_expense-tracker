const express = require('express')
const router = express.Router()
const Record = require('../../models/record')
const User = require('../../models/user')
const passport = require('passport')
const bcrypt = require('bcryptjs')

// Resgister Page
router.get('/register', (req, res) => {
  res.render('register')
})

// Resigster Function
router.post('/register', (req, res) => {
  const {name, email, password, confirmPassword} = req.body
  const errors = []
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符' })
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password
    })
  }
  User.findOne({ email })
    .then(user => {
      if (user) {
        errors.push({ message: '此Email已經註冊過了' })
        return res.render('register', {
          errors,
          name,
          email,
          password
        })
      }
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(password, salt))
        .then(hash => User.create({
          name,
          email,
          password: hash
        }))
      .then(() => {res.redirect('/')})
      .catch(err => console.log(err))
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
    req.flash('success_msg', '已成功登出')
    res.redirect('/users/login')
  })
})

module.exports = router