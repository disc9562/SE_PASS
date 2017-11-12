'use strict';
const Async = require('async');
const Boom = require('boom');
const Config = require('../../config');
const Joi = require('joi');


const internals = {};

internals.applyRoutes = function (server, next) {
    const SeAccount = server.plugins['hapi-mongo-models'].SeAccount;

    server.route({
        method:'POST',
        path:'/signupSE',
        config: {
            validate: {
                payload: {
                    email: Joi.string().email().lowercase().required(),
                    username: Joi.string().token().lowercase().required(),
                    id: Joi.string().required(),
                    password: Joi.string().required(),
                    role:Joi.string().required()
                }
            },
            pre: [{
                assign: 'usernameCheck',
                method: function (request, reply) {

                    const conditions = {
                        username: request.payload.username
                    };

                    SeAccount.findOne(conditions, (err, user) => {

                        if (err) {
                            return reply(err);
                        }

                        if (user) {
                            return reply(Boom.conflict('Username already in use.'));
                        }

                        reply(true);
                    });
                }
            }, {
                assign: 'emailCheck',
                method: function (request, reply) {

                    const conditions = {
                        email: request.payload.email
                    };

                    SeAccount.findOne(conditions, (err, user) => {

                        if (err) {
                            // console.log('emailCheck')
                            return reply(err);
                        }

                        if (user) {
                            return reply(Boom.conflict('Email already in use.'));
                        }

                        reply(true);
                    });
                }
            }]
        },
        handler:function(request, reply){
            Async.auto({
                user:function(done){
                    const username = request.payload.username;
                    const email = request.payload.email;
                    const id = request.payload.id;
                    const password = request.payload.password;
                    const role = request.payload.role;
                    
                    SeAccount.create(username, password, email, id, role, done)
                }
            }, (err, results)=>{
                if(err){
                    // console.log('500')
                    reply(err)
                    // console.log(err)
                }
                reply(results)
            })
        }
    })
    next()
}

exports.register = function(server, options, next){

    server.dependency([], internals.applyRoutes);

    next()
}

exports.register.attributes = {
    name: 'signupSE'
};