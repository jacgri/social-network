var path = require('path')

require('dotenv').config({
    path: path.join(__dirname, '../settings.env')
})
var mongoose = require('mongoose')
var User = require('../models/User')
var usersControllers = require('../controllers/usersControllers.js')


describe('Users', function(){
    beforeAll(function(){
        mongoose.connect(process.env.DATABASE_URL_TEST, {
            useMongoClient: true
        })
    })  

    afterAll(function(){
        mongoose.disconnect()
    })


        test('email is required', function(){
            var user = new User()
            var error = user.validateSync()
            expect(error).not.toBeUndefined()
            expect(error.errors.emailAddress.message).toBe('Email address is required.')
        })

        test('password is required', function(){
            var user = new User()
            var error = user.validateSync()
            expect(error).not.toBeUndefined()
            expect(error.errors.password.message).toBe('Password is required.')
           
        })

        test('checks email address is valid', function(){
            var user = new User({ emailAddress: 'hello!'})
            var error = user.validateSync()
            expect(error).not.toBeUndefined()
            expect(error.errors.emailAddress.message).toBe('Email address isn\'t valid.')
        })

        test('login requests user with matching email address and password.', function(){
            var spy = spyOn(User, 'findOne')
            var user = {
                emailAddress:'hello@world.com',
                password:'password123'
            }

            var callback = jest.fn()
            User.login(user, callback)
            expect(spy).toHaveBeenCalledWith(user, callback)
            
        })

        test('login static is called when we post to the login route', function(){
            var spy = spyOn(User, 'login')
            var req = { 
                body: {
                    emailAddress: 'hello@world.com', 
                    password: 'password123'
                }
            }
            var res = {}
            usersControllers.login(req,res)
            expect(spy).toHaveBeenCalledWith(req.body)

        })

        test('register inserts a user with email and password', function(done){
            var user = {
                emailAddress:'hello@world.com',
                password:'password123'
            }
            var callback = function(){
                User.findOne({}, function(error, result){
                    expect(error).not.toBeTruthy()
                    expect(result.emailAddress).toBe(user.emailAddress)
                    expect(result.password).toBe(user.password)
                    done()
                })
            }
            User.register(user, callback)

        })



})

