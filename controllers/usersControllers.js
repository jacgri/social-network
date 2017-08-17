var User = require('../models/User')

var usersControllers = {
    login: function(req, res, next){
        User.login(req.body, function(error, result){
            if(!error){
                req.session.user = result
                next()
            }
        })
    },

    register: function(req, res, next){
        User.register(req.body, next)
    },

    logout: function (req, res, next) {
        req.session.reset()
        next()
    },

    editProfile: function (req, res, next) {
        const user = {
          _id: req.session.user._id,
          bio: req.body.bio,
          homeTown: req.body.homeTown
        }
        User.editProfile(user, next)
    }

    

}

module.exports = usersControllers