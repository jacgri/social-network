var usersRoutes = require('./routes/usersRoutes.js')

var path = require('path')

require('dotenv').config({
  path: path.join(__dirname, 'settings.env')
})

var mongoose = require('mongoose')

mongoose.connect(process.env.DATABASE_URL, {
    useMongoClient: true
  })

var express = require('express')
var exphbs = require('express-handlebars')
var app = express()
var sessions = require('client-sessions')

app.use(sessions({
    cookieName: 'session',
    secret: 'gds668asgdg2j9797sgjh73289jbhgj2'
  }))

app.engine('.hbs', exphbs({
    extname: '.hbs',
    defaultLayout: 'main'
}))

app.set('view engine', '.hbs')

app.use(express.static('public'))

usersRoutes(app)

app.listen(3000)