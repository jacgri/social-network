var User = require('../models/User')

var usersControllers = {
    login: function(req, res){
        User.login(req.body)
    }

}

module.exports = usersControllers