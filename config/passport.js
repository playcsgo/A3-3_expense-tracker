const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config()

module.exports = app => {
  //初始化middleware
  app.use(passport.initialize())
  app.use(passport.session())

  //設定LocalStrategy
  passport.use(new LocalStrategy({ usernameField: 'email'}, (email, password, done) => {
      User.findOne({ email })
        .lean()
        .then(user => {
          if (!user) { return done(null, false, { message: 'This mail is not registered' }) }
          if (user.password !== password) { return done(null, false, { message: 'Email or Password incorrect' })}
          return done(null, user);
        })
        .catch(err => done(err, false))
      }))
        
  //facebook-strategy

  //session序列與反序列化
  passport.serializeUser(function(user, done) {
    console.log(user)
    done(null, user._id);
  })
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  });
}