var User = require('../models/User')
var usersControllers = require('../controllers/usersControllers.js')


describe('Users', function(){
      
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
                emailAdress:'hello@world.com',
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
                    emailAddres: 'hello@world.com', 
                    password: 'password123'
                }
            }
            var res = {}
            usersControllers.login(req,res)
            expect(spy).toHaveBeenCalledWith(req.body)

        })



})

