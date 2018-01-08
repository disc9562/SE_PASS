let express = require('express'),
    app = express(),
    port = process.env.PORT || 9090,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
let SeAccount = require('./models/se_account')
let SeCourse = require('./models/se_course')
let SeCourseInfo = require('./models/se_courseInfo')
let SeAssignment = require('./models/se_assignment')
let seAssignment = require('./controller/seAssignmentController')
let jenkinsApi = require('jenkins-api')
let {Querystring} = require('request/lib/querystring.js')
Querystring.prototype.unescape = function (val) { return val }

const jenkins = jenkinsApi.init('http://sepass:lab1321@140.124.181.81:8080')
const async = require('async');
const rimraf = require('rimraf')
const fs = require('fs')
const unzip = require('unzip')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const os = require('os')
const path = require('path')

mongoose.Promise = global.Promise;
if(process.env.NODE_ENV !== 'test'){
  mongoose.connect('mongodb://localhost:27017/frame')  
}

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})
app.use(cors())
app.options('*', cors())
app.use(fileUpload())
app.options('/upload',fileUpload())

let seAccountRoute = require('./routes/seAccountRoute')
let seAssignmentRoute = require('./routes/seAssignmentRoute')
let seCourseRoute = require('./routes/seCourseRoute')
let seCourseInfoRoute = require('./routes/seCourseInfoRoute')

seAccountRoute(app)
seCourseRoute(app)
seCourseInfoRoute(app)
seAssignmentRoute(app)

let uploadFilePath
app.post('/uploadByTeacher', function(req, res) {
  if(fs.existsSync(path.join(os.homedir(),'seWorkSpace',req.body.courseName,req.body.assignmentName +'_teacher')))
  {
    rimraf(path.join(os.homedir(),'seWorkSpace',req.body.courseName,req.body.assignmentName +'_teacher'),function(){
      console.log('Reomove File!')
      uploadFileFromTeacher(req, res)
    })
  }
  else{
    uploadFileFromTeacher(req, res)
  }
})
app.post('/uploadByStudent', function(req, res) {
  if(fs.existsSync(path.join(os.homedir(),'seWorkSpace',req.body.courseName,req.body.assignmentName +'_'+req.body.studentId)))
  {
    rimraf(path.join(os.homedir(),'seWorkSpace',req.body.courseName,req.body.assignmentName +'_'+req.body.studentId),function(){
      rimraf(path.join(os.homedir(),'seWorkSpace',req.body.courseName,req.body.assignmentName +'_'+req.body.studentId+'.zip'),function(){
        console.log('Reomove File!')
        uploadFileFromStudent(req, res)
      })
    })
  }
  else{
  uploadFileFromStudent(req, res)
  }
})
app.get('/download', function(req, res){   
  let file = path.join(os.homedir(),'seWorkSpace',req.query.courseName,req.query.assignmentName +'_'+req.query.id +'.zip')
  if(!file){
    return res.status(400).send('No files were downloaded.')
    }
  res.download(file,function(err){
    if (err){
      res.status(500).send(err)
    }
    else{
      console.log('downloading')
    }
  }) 
})

app.post('/createJenkinsJob',function(req, res){
  const jobPath = 'C:\\Users\\jay\\seWorkSpace'
  let courseName = req.body.courseName
  let assignmentName = req.body.assignmentName
  let studentId = req.body.studentId
  jenkins.create_job(`${courseName}_${assignmentName}_${studentId}`
  , initXML(jobPath, courseName, assignmentName, studentId)
  , function (err, data) {
    if (err) {
      res.json({'err':err})
    } else {
      res.json({'result':data})
    }
  })
})

app.post('/jenkinsBuild',function(req, res){
  let jobName = req.body.jobName
  jenkins.build(jobName,function(err, data){
    if(err){
      res.json({'err':err})
    }
    res.json({'result':data})
  })
})

app.get('/getjenkinsJobInfo',function(req, res){
  let queueId = req.query.queueId
  jenkins.queue_item(queueId,function(err,data){
    if (err){
      res.json({'err':err})
    }
    res.json({'result':data})
  })
})

app.get('/getAssignmentReport',function(req,res){
  let jobName = req.query.jobName
  jenkins.last_build_info(jobName,function(err,data){
    if (err){
      res.json({'err':err})
    }
    res.json({'result':data})
  })
})

function initXML (jobPath, courseName, homeworkName, studentId) {
  let xml = `<project>
<keepDependencies>false</keepDependencies>
<properties/>
<scm class="hudson.scm.NullSCM"/>
<canRoam>false</canRoam>
<disabled>false</disabled>
<blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
<blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
<triggers/>
<concurrentBuild>false</concurrentBuild>
<customWorkspace>${jobPath + '\\' + courseName + '\\' + homeworkName + '_' + studentId}</customWorkspace>
<builders>
<hudson.tasks.BatchFile>
  <command>rmdir /s/q ${jobPath + '\\' + courseName + '\\' + homeworkName + '_' + studentId + '\\src\\test'}</command>
</hudson.tasks.BatchFile>
<hudson.tasks.BatchFile>
  <command>xcopy ${jobPath + '\\' + courseName + '\\' + homeworkName + '_teacher'} ${jobPath + '\\' + courseName + '\\' + homeworkName + '_' + studentId + '\\src\\'} /E</command>
</hudson.tasks.BatchFile>
<hudson.tasks.Maven>
  <targets>test</targets>
  <mavenName>maven</mavenName>
  <usePrivateRepository>false</usePrivateRepository>
  <settings class="jenkins.mvn.DefaultSettingsProvider"/>
  <globalSettings class="jenkins.mvn.DefaultGlobalSettingsProvider"/>
  <injectBuildVariables>false</injectBuildVariables>
</hudson.tasks.Maven>
</builders>
<publishers>
<net.masterthought.jenkins.CucumberReportPublisher plugin="cucumber-reports@3.13.0">
  <fileIncludePattern>**/*.json</fileIncludePattern>
  <fileExcludePattern></fileExcludePattern>
  <jsonReportDirectory></jsonReportDirectory>
  <failedStepsNumber>0</failedStepsNumber>
  <skippedStepsNumber>0</skippedStepsNumber>
  <pendingStepsNumber>0</pendingStepsNumber>
  <undefinedStepsNumber>0</undefinedStepsNumber>
  <failedScenariosNumber>0</failedScenariosNumber>
  <failedFeaturesNumber>0</failedFeaturesNumber>
  <trendsLimit>0</trendsLimit>
  <parallelTesting>false</parallelTesting>
  <sortingMethod>ALPHABETICAL</sortingMethod>
  <classifications class="empty-list"/>
  <classificationsFilePattern></classificationsFilePattern>
</net.masterthought.jenkins.CucumberReportPublisher>
</publishers>
<buildWrappers/>
</project>`
  return xml
}

function uploadFileFromTeacher(req, res){
  if(!fs.existsSync(path.join(os.homedir(),'seWorkSpace'))){
    fs.mkdirSync(path.join(os.homedir(),'seWorkSpace'))
  }
  if(!fs.existsSync(path.join(os.homedir(),'seWorkSpace',req.body.courseName))){
    fs.mkdirSync(path.join(os.homedir(),'seWorkSpace',req.body.courseName))
  }
  uploadFilePath = path.join(os.homedir(),'seWorkSpace',req.body.courseName)

  if (!req.files){
    return res.status(400).send('No files were uploaded.')
  }
  req.files.file.mv(path.join(uploadFilePath,req.files.file.name), function(err) {
    console.log(req.files.file.name)
    if (err){
      return res.status(500).send(err)
    }
    fs.createReadStream(path.join(uploadFilePath,req.files.file.name))
    .pipe(unzip.Extract({ path:path.join( uploadFilePath , req.body.assignmentName +'_teacher') }))
    .on('close', function () {
      rimraf(path.join(uploadFilePath,req.files.file.name),function(){
        res.send('File unzip!')
      })
    })
  })
}
function uploadFileFromStudent(req, res){
  seAssignment.updateAssignmentCommit(req,res)
  if(!fs.existsSync(path.join(os.homedir(),'seWorkSpace'))){
    fs.mkdirSync(path.join(os.homedir(),'seWorkSpace'))
  }
  if(!fs.existsSync(path.join(os.homedir(),'seWorkSpace',req.body.courseName))){
    fs.mkdirSync(path.join(os.homedir(),'seWorkSpace',req.body.courseName))
  }
  uploadFilePath = path.join(os.homedir(),'seWorkSpace',req.body.courseName)

  if (!req.files){
    return res.status(400).send('No files were uploaded.')
  }
  req.files.file.mv(path.join(uploadFilePath,req.files.file.name), function(err) {
    console.log(req.files.file.name)
    if (err){
      return res.status(500).send(err)
    }
    fs.createReadStream(path.join(uploadFilePath,req.files.file.name))
    .pipe(unzip.Extract({ path:path.join( uploadFilePath , req.body.assignmentName +'_'+ req.body.studentId) }))
    .on('close', function () {
      // rimraf(path.join(uploadFilePath,req.files.file.name),function(){
        res.send('File unzip!')
      // })
    })
  })

}
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
  res.status(err.status || 500).send({
  message: err.message,
  error: err
    });
  });
}

  // production error handler
  // no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500).send({
    message: err.message,
    error: err
  });
});

app.listen(port)
console.log('todo list RESTful: ' + port)
module.exports = app;

