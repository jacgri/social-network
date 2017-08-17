var mongoose = require('mongoose')
var validator = require('validator')
var crypto = require('crypto')

var UserSchema = new mongoose.Schema({

    emailAddress: {
        type:String,
        required:[true,'Email address is required.'],
        validate:[function (value){
            return validator.isEmail(value)
        }, 'Email address isn\'t valid.']
   },
    password:{
        type:String,
        required:[true, 'Password is required.']
    },
    homeTown:{
        type:String,
        required:false
    },
    bio: {
        type: String,
        required: false
    }
})

    UserSchema.statics = {
        login: function(user, callback){
            var hash = crypto.createHash('sha256')
            hash.update(user.password)
            user.password = hash.digest('hex')
            return User.findOne(user,callback)
        },
        register: function(user, callback){
            var hash = crypto.createHash('sha256')
            hash.update(user.password)
            user.password = hash.digest('hex')
            const newUser = new this(user)
            newUser.save(callback)
        },

        editProfile: function (user, callback) {
            User.update({_id:user._id}, {
              $set: {
                bio: user.bio,
                homeTown: user.homeTown
              }
            }, callback)
          }
    }


var User = mongoose.model('User', UserSchema)

module.exports = User