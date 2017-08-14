var bodyParser = require('body-parser')
var usersControllers= require('../controllers/usersControllers')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var usersRoutes = function(app){
    app.get('/', function (req, res) {
        res.render('home', { currentUser: req.session.user })
        
    })

    app.get('/register', function (req, res) {
        res.render('register')
        
    })

    app.post('/register', urlencodedParser, usersControllers.register, function (req, res) {
        res.redirect('/')
    })

    app.get('/login', function (req, res) {
        res.render('login')
    })

    app.post('/login', urlencodedParser, usersControllers.login, function (req, res) {
        res.redirect('/')
    })

    app.get('/login', usersControllers.logout, function(req,res){
        req.redirect('/')
    })

}