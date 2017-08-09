var User = require('../models/User')

var usersControllers = {
    login: function(req, res){
        User.login(req.body)
    },

    register: function(req, res){
        User.register(req.body)
    }

}

module.exports = usersControllers