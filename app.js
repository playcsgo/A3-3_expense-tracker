const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('express-session')
const usePassport = require('./config/passport')
const flash = require('connect-flash')
require('dotenv').config()
const PORT = process.env.PORT || 3000
require('./config/mongoose')

app.use(express.static('public'))

const hbsHelper = require('./hbs-Helper')
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: 'hbs', helpers: hbsHelper}))


app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))

app.use(flash())
usePassport(app)
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})
app.use(routes)
app.listen(PORT, () => {
  console.log(`server is running on localhost:${PORT}`)
})