const express = require('express')
const fs = require('fs')
const unzip = require('unzip')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const app = express()

app.use(cors())
app.options('*', cors())
app.use(fileUpload())
app.options('/upload',fileUpload())

const assignmentPath = 'C:/Users/user/Desktop/upload/'

app.post('/upload', function(req, res) {
  if (!req.files){
    return res.status(400).send('No files were uploaded.')
  }
  req.files.file.mv(assignmentPath + req.files.file.name, function(err) {
    if (err){
      return res.status(500).send(err)
    }
    fs.createReadStream(assignmentPath + req.files.file.name)
    .pipe(unzip.Extract({ path: 'C:/Users/user/Desktop/upload/' }))
    .on('close', function () {
      res.send('File unzip!')
    })
  })
})

app.get('/download', function(req, res){
  let file = 'C:/Users/user/Desktop/eclipse.zip'
  if(!file){
    return res.status(400).send('No files were downloaded.')
  }
  res.download(file,function(err){
    if (err){
      res.status(500).send(err)
    }
  }) 
})

app.listen(3000, function () {
  console.log('upload/download file Server listening on port 3000!')
})