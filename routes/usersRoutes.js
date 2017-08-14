var bodyParser = require('body-parser')

var urlencodedParser = bodyParser.urlencoded({ extended: false })

var usersRoutes = function(app){
    app.get('/', function (req, res) {
        res.render('home', { currentUser: req.session.user })
        
    })

}