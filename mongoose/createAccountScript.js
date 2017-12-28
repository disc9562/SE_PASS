let accountList = [
  {
    username:"蔣偉博",
    password:"1234",
    email:"s1@gmail.com",
    id:"s1",
    role: ["student"],
    TA: "No"
  },
  {
    username:"蔣友伲",
    password:"1234",
    email:"s2@gmail.com",
    id:"s2",
    role: ["student"],
    TA: "No"
  },
  {
    username:"陳政好",
    password:"1234",
    email:"s3@gmail.com",
    id:"s3",
    role: ["student"],
    TA: "No"
  },
  {
    username:"連預先",
    password:"1234",
    email:"s4@gmail.com",
    id:"s4",
    role: ["student"],
    TA: "No"
  },
  {
    username:"王裕响",
    password:"1234",
    email:"s5@gmail.com",
    id:"s5",
    role: ["student"],
    TA: "No"
  },
  {
    username:"王美",
    password:"1234",
    email:"s6@gmail.com",
    id:"s6",
    role: ["student"],
    TA: "No"
  },
  {
    username:"李麗",
    password:"1234",
    email:"s7@gmail.com",
    id:"s7",
    role: ["student"],
    TA: "No"
  },
  {
    username:"黃怡",
    password:"1234",
    email:"s8@gmail.com",
    id:"s8",
    role: ["student"],
    TA: "No"
  },
  {
    username:"Jay",
    password:"1234",
    email:"t1@gmail.com",
    id:"t1",
    role: ["teacher"],
    TA: "No"
  },
  {
    username:"Wayne",
    password:"1234",
    email:"t2@gmail.com",
    id:"t2",
    role: ["teacher"],
    TA: "No"
  },
  {
    username:"Hank",
    password:"1234",
    email:"t3@gmail.com",
    id:"t3",
    role: ["teacher"],
    TA: "Yes"
  },
  {
    username:"JohnSon",
    password:"1234",
    email:"s9@gmail.com",
    id:"s9",
    role: ["student"],
    TA: "Yes"
  },
]

const axios = require('axios')

function initAxiosPromise () {
  return accountList.map(function (eachAccount) {
    return axios.post('http://localhost:9090/api/signupSE', eachAccount)
  })
}
axios.all(initAxiosPromise())
.then(function (response) {
  console.log('create fake account success')
}).catch(function (err) {
  console.log(err)
})