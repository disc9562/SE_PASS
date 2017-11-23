let mongoose = require('mongoose'),
    seAccount = mongoose.model('SeAccount')
exports.create = function(req,res){
  console.log(req.body.username)
  let document = {
    'username' : req.body.username,
    'password' : req.body.password,
    'email' : req.body.email,
    'id' : req.body.id,
    'role' : req.body.role
  }
   
    seAccount.insertMany(document)
    .then((result)=>{
      res.send(result)
    }).catch((err)=>{
      res.json({ error: err })
    })
}
exports.getAccountListByRole = function(req,res){
  let role = req.query.role
  let page = req.query.page
  let per_page = req.query.per_page
  let current_page = 1
  let last_page = 1
  let domain = "http://localhost:9000/api"
  if(page){
    current_page = page * 1
  }
  seAccount.find({'role':role})
            .then((result)=>{
              console.log(result)
              res.json(result)
            }).catch((err)=>{
              res.json({ error: err })
            })
}   