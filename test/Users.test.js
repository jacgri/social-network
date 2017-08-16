var path = require('path')

require('dotenv').config({
    path: path.join(__dirname, '../settings.env')
})
var mongoose = require('mongoose')
var User = require('../models/User')
var usersControllers = require('../controllers/usersControllers.js')


describe('Users', function(){

    beforeEach(function (done) {
        User.remove({}, function(){
            done()
        })
    })


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

        test('register static is called when we post to the register route', function(){
            var spy = spyOn(User, 'register')

            var req = {
                body: {
                    emailAddress: 'hello@world.com', 
                    password: 'password123',
                    confirmPassord: 'password123'
                } 
            }

            var res = {}
            var callback = jest.fn()

            usersControllers.register(req, res, callback)

            expect(spy).toHaveBeenCalledWith(req.body, callback)
        })

        test('can\`t login if not registered', function(done){
            var user = {
                emailAddress: 'hello@world.com',
                password: 'password123'
            }
            User.login(user, function(error, result){
                expect(error).not.toBeTruthy()
                expect(result).not.toBeTruthy()
                done()
            })
        })

        test('can login if registered', function(done){
            var user = {
                emailAddress: 'hello@world.com',
                password: 'password123'
            }
            var userClone = Object.assign({}, user)

            User.register(user, function(){
                User.login(userClone, function(error,result){
                    expect(error).not.toBeTruthy()
                    expect(result).toBeTruthy()
                    done()
                })
            })
        })

        test('login static creates a session', function(done){
            var req = {
                body: {
                    emailAddress: 'hello@world.com', 
                    password: 'password123'
                },
                session: {}
            }
            var res = {}

            User.register(req.body, function(error, result){
                usersControllers.login(req, res, function(){
                    expect(req.session.user).not.toBeUndefined()
                    done()
                })
            })
        })

        test('logout clears the session', function () {
            var req = {
              session: {
                user: {
                  emailAddress: 'email@example.com',
                  password: 'password123'
                }
              }
            }
            var res = {}
            var next = jest.fn()
          
            usersControllers.logout(req, res, next)
            expect(req.session.user).toBeFalsy()
          })
          

          test('can edit profile', function () {
            var user = {
              emailAddress: 'email@example.com',
              password: 'password123'
            }
          
            User.register(user, function () {
              User.editProfile(user, function (error, result) {
                expect(error).toBeFalsy()
                expect(result).toBeTruthy()
              })
            })
          })          

})

