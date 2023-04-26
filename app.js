const express = require('express')
const app = express()
const port = 3000
const exphbs = require('express-handlebars')
const routes = require('./routes')
const methodOverride = require('method-override')
const session = require('express-session')

require('dotenv').config()
require('./config/mongoose')
app.use(express.static('public'))
app.engine('hbs', exphbs.engine({defaultLayout: 'main', extname: 'hbs'}))

app.use(session({
  secret: 'MySecret',
  resave: false,
  saveUninitialized: true
}))

app.set('view engine', 'hbs')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))


app.use(routes)
app.listen(port, () => {
  console.log(`server is running on localhost:${port}`)
})