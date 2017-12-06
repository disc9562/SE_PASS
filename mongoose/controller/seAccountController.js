let mongoose = require('mongoose'),
    seAccount = mongoose.model('SeAccount')
exports.create = function(req,res){
  let document = {
    'username' : req.body.username,
    'password' : req.body.password,
    'email' : req.body.email,
    'id' : req.body.id,
    'role' : req.body.role,
    'TA' : req.body.TA
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
  let prev_page_url = null
  let domain = "http://140.124.181.81:9090/api"
  let vuetableFormat = {}
  if(page){
    current_page = page * 1
  }
  seAccount.find({'role':role})
            .then((result)=>{                     
              if(result.length % 10 === 0 && result.length !== 0){
                last_page = result.length / 10
              }
              else{
                  last_page = Math.round(result.length / 10) + 1
              }                               
              if(current_page > 1){
                  prev_page_url = domain + '/getAccountListByRole?role=' + role + '&sort=&page=' + (current_page - 1) +'&per_page=' + per_page
              }             
              vuetableFormat.total = result.length
              vuetableFormat.per_page = per_page
              vuetableFormat.current_page = current_page
              vuetableFormat.last_page = last_page
              vuetableFormat.next_page_url = domain + '/getAccountListByRole?role=' + role + '&sort=&page=' + (current_page + 1) +'&per_page=' + per_page
              vuetableFormat.prev_page_url = prev_page_url
              vuetableFormat.from = 1 + 10 * (current_page - 1)
              vuetableFormat.to = 10 * current_page
              vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
              res.json(vuetableFormat)
            }).catch((err)=>{
              res.json({ error: err })
            })
}

exports.delete = function(req, res){
  console.log('delete')
  seAccount.remove({id:req.params.id})
  .then((result)=>{
    res.send(result)
  }).catch((err)=>{
    res.json(err)
  })
}

exports.login = function(req, res){
  let id = req.body.id
  let password = req.body.password

  seAccount.find({'id': id})
  .then((result)=>{
    if(result.length === 0){
      res.json({fail:'there is no account'})
    }else if(result[0].password !== password){
      res.json({fail:'password error'})
    }else{
      res.send(result)
    }
  }).catch((err)=>{
    res.json(err)
  })
}