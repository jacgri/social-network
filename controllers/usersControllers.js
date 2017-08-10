var User = require('../models/User')

var usersControllers = {
    login: function(req, res, next){
        User.login(req.body, function(error, result){
            if(!error){
                req.user.session = result
                next()
            }
        })
    },

    register: function(req, res){
        User.register(req.body)
    }

}

module.exports = usersControllers