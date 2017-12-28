let courseList = [
  {
    coursename:"SE",
    courseteacher:"Jay",
    TA: ["JohnSon"],
    classtime:"每周二-14:00~15:00,每周三-16:00~18:00",
    population: 75,
    coursedescription: "不是教你寫，是教你怎麼跑"
  },
  {
    coursename:"POSD",
    courseteacher:"Wayne",
    TA: ["JohnSon"],
    classtime:"每周三-09:00~10:00,每周五-10:00~12:00",
    population: 88,
    coursedescription: "不是教你寫，是教你怎麼想"
  },
  {
    coursename:"OOAD",
    courseteacher:"Hank",
    TA: ["JohnSon"],
    classtime:"每周二-17:00~18:00,每周三-10:00~12:00",
    population: 68,
    coursedescription: "不是教你寫，是教你怎麼做"
  }
]

const axios = require('axios')

function initAxiosPromise () {
  return courseList.map(function (eachCourse) {
    return axios.post('http://localhost:9090/api/addCourseSE', eachCourse)
  })
}
axios.all(initAxiosPromise())
.then(function (response) {
  console.log('create fake course success')
}).catch(function (err) {
  console.log(err)
})