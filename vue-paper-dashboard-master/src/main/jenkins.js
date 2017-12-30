import {Querystring} from 'request/lib/querystring.js'
import axios from 'axios'
import jenkinsApi from 'jenkins-api'

// let jenkins = jenkinsApi.init('http://wayne:wayne@192.168.99.100:8080')
let jenkins = jenkinsApi.init('http://sepass:lab1321@140.124.181.81:8080')
const jobPath = 'C:\\Users\\jay\\seWorkSpace'
Querystring.prototype.unescape = function (val) { return val }
exports.createJob = function (courseId, courseName, homeworkName) {
  axios.get('http://localhost:9090/api/getStudentsList?courseId=' + courseId)
  .then((result) => {
    let studentList = result.data.data
    studentList.forEach(student => {
      jenkins.create_job(`${courseName}_${homeworkName}_${student.id}`
                          , initXML(jobPath, courseName, homeworkName, student.id)
                          , function (err, data) {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log(data)
                            }
                          })
    })
  })
}
function initXML (jobPath, courseName, homeworkName, studentId) {
  let xml = `<project>
  <actions/>
  <description></description>
  <keepDependencies>false</keepDependencies>
  <properties/>
  <scm class="hudson.scm.NullSCM"/>
  <canRoam>true</canRoam>
  <disabled>false</disabled>
  <blockBuildWhenDownstreamBuilding>false</blockBuildWhenDownstreamBuilding>
  <blockBuildWhenUpstreamBuilding>false</blockBuildWhenUpstreamBuilding>
  <triggers/>
  <concurrentBuild>false</concurrentBuild>
  <customWorkspace>${jobPath + '\\' + courseName + '\\' + homeworkName + '_' + studentId}</customWorkspace>
  <builders>
    <hudson.tasks.BatchFile>
      <command>javac -sourcepath src -cp lib\\*;classes -d classes src\\unitTest\\UT_${homeworkName}.java</command>
    </hudson.tasks.BatchFile>
    <hudson.tasks.BatchFile>
      <command>@ping 127.0.0.1 -n 5 -w 1000 &gt; nul</command>
    </hudson.tasks.BatchFile>
    <hudson.tasks.BatchFile>
      <command>java -cp lib\\*;classes org.junit.runner.JUnitCore unitTest.UT_${homeworkName}</command>
    </hudson.tasks.BatchFile>
  </builders>
  <publishers/>
  <buildWrappers/>
</project>`
  return xml
}

// 建構job
// fs.readFile(path.resolve(__dirname, './jenkinsConfig/CppConfig.xml'), 'utf-8', function (err, result) {
//   if (err) { console.error(new Error('路徑有錯')) } else {
//     jenkins.create_job('OOP-Hw1C++_105598054-UT'
//     , result
//     , function (err, data) {
//       if (err) {
//         return console.error(err)
//       } else {
//         console.log('成功')
//         console.log(data)
//       }
//     })
//   }
// })

// 建構view
// jenkins.create_view('OOP'
//                     , function (err, data) {
//                       if (err) { return console.log(err) }
//                       console.log(data)
//                     })

// 將job加入view
// jenkins.add_job_to_view('OOP', 'OOP-Hw1C++_105598054-UT', function (err, data) {
//   if (err) { return console.log(err) }
//   console.log(data)
// })

// 取得所有build紀錄
// jenkins.job_info('DefaultInvoice_Clone'
//                  , function (err, data) {
//                    if (err) { return console.log(err) }
//                    console.log(data)
//                  }
//                 )

// 用來build
// jenkins.build('OOP-Hw1C++_105598054-UT', function (err, data) {
//   if (err) { return console.log(err) }
//   console.log(data)
// })

// 用來拿 test result
// jenkins.test_result('OOP-Hw1C++_105598054-UT', '1', function (err, data) {
//   if (err) { return console.log(err) }
//   console.log(data)

//   let suite = JSON.stringify(data.suites[1].cases)
//   let errorDetails = JSON.parse(suite)[0].errorDetails
//   let errorStackTrace = JSON.parse(suite)[0].errorStackTrace
//   console.log('\n')
//   console.log(errorDetails)
//   console.log('\n')
//   console.log(errorStackTrace)
//   console.log('\n')
// })

// 用來拿 build-number
// jenkins.last_build_info('OOP-Hw1C++_105598054-UT', function (err, data) {
//   if (err) { return console.log(err) }
//   console.log(data)
// })
