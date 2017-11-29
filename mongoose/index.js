
let express = require('express'),
    app = express(),
    port = process.env.PORT || 9090,
    mongoose = require('mongoose'),
    bodyParser = require('body-parser')
let SeAccount = require('./models/se_account')
let SeCourse = require('./models/se_course')
mongoose.Promise = global.Promise;
if(process.env.NODE_ENV === 'CI'){
  mongoose.connect('mongodb://172.19.0.2:27017/frame')
}else{
  mongoose.connect('mongodb://localhost:27017/frame')  
}


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  next()
})

let seAccountRoute = require('./routes/seAccountRoute')
let seCourseRoute = require('./routes/seCourseRoute')

seAccountRoute(app)
seCourseRoute(app)
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

