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

    server.route({
        method:'GET',
        path:'/getAccountListByRole',
        config:{
            cors:{
                origin:['*'],
                additionalHeaders: ['cache-control', 'x-requested-with']
            },
            validate:{
                query:{
                    role:Joi.string().required(),
                    sort:Joi.empty(),
                    page:Joi.number(),
                    per_page:Joi.number()
                }
            }
        },
        handler:function(request, reply){
            var current_page = 1
            var last_page = 1
            var domain = 'http://localhost:9000/api'
            var prev_page_url = null
            var per_page = request.query.per_page
            const role = request.query.role
            if(request.query.page){
                current_page = request.query.page * 1
            }
            Async.auto({
                user: function(done){
                    var page = 1
                   
                    SeAccount.getAccountListByRole(role, done)
                }
            }, (err, results)=>{
                if(err){
                    reply(err)
                }
                var vuetableFormat = {}
                if(results.user.length % 10 === 0){
                    last_page = results.user.length / 10
                }
                else{
                    last_page = Math.round(results.user.length / 10) + 1
                }

                if(current_page > 1){
                    prev_page_url = domain + '?page=' + (current_page - 1)
                }

                vuetableFormat.total = results.user.length
                vuetableFormat.per_page = per_page
                vuetableFormat.current_page = current_page
                vuetableFormat.last_page = last_page
                vuetableFormat.next_page_url = domain + '?role=' + role + '&page=' + (current_page + 1)
                vuetableFormat.prev_page_url = prev_page_url
                vuetableFormat.from = 1 + 10 * (current_page - 1)
                vuetableFormat.to = 10 * current_page
                vuetableFormat.data = results.user.slice(vuetableFormat.from - 1 , vuetableFormat.to)
                reply(vuetableFormat)
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