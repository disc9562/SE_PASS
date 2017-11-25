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
  let domain = "http://localhost:9000/api"
  let vuetableFormat = {}
  if(page){
    current_page = page * 1
  }
  seAccount.find({'role':role})
            .then((result)=>{                       
              if(result.length % 10 === 0){
                last_page = result.length / 10
              }
              else{
                  last_page = Math.round(result.length / 10) + 1
              }                               
              if(current_page > 1){
                  prev_page_url = domain + '?page=' + (current_page - 1)
              }             
              vuetableFormat.total = result.length
              vuetableFormat.per_page = per_page
              vuetableFormat.current_page = current_page
              vuetableFormat.last_page = last_page
              vuetableFormat.next_page_url = domain + '?role=' + role + '&page=' + (current_page + 1)
              vuetableFormat.prev_page_url = prev_page_url
              vuetableFormat.from = 1 + 10 * (current_page - 1)
              vuetableFormat.to = 10 * current_page
              vuetableFormat.data = result.slice(vuetableFormat.from - 1 , vuetableFormat.to)
              res.json(vuetableFormat)
            }).catch((err)=>{
              res.json({ error: err })
            })
}   