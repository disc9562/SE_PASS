module.exports = function (app){
  let seAccount = require('../controller/seAccountController')

  app.route('/api/getAccountListByRole')
  .get(seAccount.getAccountListByRole)

  app.route('/api/signupSE')
  .post(seAccount.create)

  app.route('/api/deleteAccount')
  .post(seAccount.delete)

  app.route('/api/login')
  .post(seAccount.login)
}