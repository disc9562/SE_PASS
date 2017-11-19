'user strict'
const Async = require('async')
const Bcrypt = require('bcrypt');
const Joi = require('joi');
const MongoModels = require('mongo-models');

class SeAccount extends MongoModels{
    static create(username, password, email, id, role, callback){
        // const self = this;s

        const document = {
                    username: username,
                    password: password,
                    email: email,
                    id:id,
                    role:role,
                    timeCreated: new Date()
                };

                this.insertOne(document, (err, results)=>{
                    if(err){
                        return callback(err)
                        // console.log(err)
                    }

                    callback (null, results);
                });


        // Async.auto({
        //     newUser:function(results, done){
        //         const document = {
        //             username: username,
        //             password: password,
        //             email: email,
        //             id:id,
        //             role:role,
        //             timeCreated: new Date()
        //         };

        //         self.insertOne(document, done);
        //     }
        // }, (err, results)=>{
        //     if(err){
        //         console.log(err)
        //         return callback(err);
        //     }

        //     callback (null, results);
        // })
    }

    static getAccountListByRole(role, callback){

        const query = {role: role};

        this.find(query, callback);
        
        
    }

    constructor(attrs) {

        super(attrs);

        Object.defineProperty(this, '_roles', {
            writable: true,
            enumerable: false
        });
    }
}

SeAccount.collection = 'SeAccount';

SeAccount.schema = Joi.object({
    _id: Joi.object(),
    username: Joi.string().required(),
    password:Joi.string(),
    email: Joi.string().email().lowercase().required(),
    id: Joi.string().required(),
    roles: Joi.string().required(),
    timeCreated: Joi.date()
});

SeAccount.indexes=[
    { key: { username: 1 }, unique: true },
    { key: { email: 1 }, unique: true },
    { key: { id: 1 }, unique: true }
];

module.exports = SeAccount
