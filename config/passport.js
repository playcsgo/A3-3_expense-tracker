const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy
require('dotenv').config()
const bcrypt = require('bcryptjs')
const FacebookStrategy = require('passport-facebook')

module.exports = app => {
  //初始化middleware
  app.use(passport.initialize())
  app.use(passport.session())

  //設定LocalStrategy
  passport.use(new LocalStrategy({ usernameField: 'email', passReqToCallback: true}, (req, email, password, done) => {
      User.findOne({ email })
        .lean()
        .then(user => {
          if (!user) { 
            req.flash('warning_msg', 'This mail is not registered by flash')
            return done(null, false, { message: 'This mail is not registered' })}
          return bcrypt.compare(password, user.password).then(isMatch => {
            if (!isMatch) {
              req.flash('warning_msg', 'email or password incorrect by flash')
              return done(null, false, { message: 'email or password incorrect' })
            }
            return done(null, user)
          })
        })
        .catch(err => done(err, false))
      }
    ))
        
  //facebook-strategy
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  },
  function(accessToken, refreshToken, profile, done) {
    const { name, email } = profile._json
    User.findOne({ email })
      .then(user => {
        if (user) return done(null, user)
        const randomPassword = Math.random().toString(36).slice(-8)
        bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(randomPassword, salt))
          .then(hash => User.create({
            name,
            email,
            password: hash
          }))
          .then(user => done(null, user))
          .catch(err => done(err, false))
      })
  }))
    
  //session序列與反序列化
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  })
  
  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .lean()
      .then(user => done(null, user))
      .catch(err => done(err, null))
  });
}