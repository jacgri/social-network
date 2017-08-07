var mongoose = require('mongoose')
var validator = require('validator')

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
    }
})

var User = mongoose.model('User', UserSchema)

module.exports = User