const jenkinsApi = require('jenkins-api')
let jenkins = jenkinsApi.init('http://sepass:lab1321@140.124.181.81:8080')

jenkins.queue_item(55, function (err, data1) {
  if (err) {
    console.log(`[err] ${JSON.stringify(err)}`)
      // res.json({'err':err})
  }
  console.log(`[data1] ${JSON.stringify(data1)}`)
    // res.json({'result':data1})
})
