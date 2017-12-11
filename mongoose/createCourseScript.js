'coursename' 
'courseteacher' 
'TA' 
'classtime' 
'population' 
'coursedescription' 

let courseList = [
  {
    username:"蔣偉博",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598001",
    role: ["student"],
    TA: "No"
  },
  {
    username:"蔣友伲",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598002",
    role: ["student"],
    TA: "No"
  },
  {
    username:"陳政好",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598003",
    role: ["student"],
    TA: "No"
  },
  {
    username:"連預先",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598004",
    role: ["student"],
    TA: "No"
  },
  {
    username:"王裕响",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598005",
    role: ["student"],
    TA: "No"
  },
  {
    username:"王美",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598101",
    role: ["student"],
    TA: "No"
  },
  {
    username:"李麗",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598102",
    role: ["student"],
    TA: "No"
  },
  {
    username:"黃怡",
    password:"123456",
    email:"letitgo@gmail.com",
    id:"107598103",
    role: ["student"],
    TA: "No"
  },
  {
    username:"Jay",
    password:"123456",
    email:"eatChicken@gmail.com",
    id:"T05598053",
    role: ["teacher"],
    TA: "No"
  },
  {
    username:"Wayne",
    password:"123456",
    email:"oneForAll@gmail.com",
    id:"T05598054",
    role: ["teacher"],
    TA: "No"
  },
  {
    username:"Hank",
    password:"123456",
    email:"IamAwesome@gmail.com",
    id:"T05598055",
    role: ["teacher"],
    TA: "Yes"
  },
  {
    username:"JohnSon",
    password:"123456",
    email:"IamSuperMan@gmail.com",
    id:"105598056",
    role: ["student"],
    TA: "Yes"
  },
]

const axios = require('axios')

function initAxiosPromise () {
  return courseList.map(function (eachCourse) {
    return axios.post('http://localhost:9090/api/signupSE', eachCourse)
  })
}
axios.all(initAxiosPromise())
.then(function (response) {
  console.log('create fake course success')
}).catch(function (err) {
  console.log(err)
})