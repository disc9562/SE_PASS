const fs = require('fs')
const path = require('path')
let jenkinsApi = require('jenkins-api')
// let jenkins = jenkinsApi.init('http://wayne:wayne@192.168.99.100:8080')
let jenkins = jenkinsApi.init('http://jay:jay@192.168.99.100:8080')

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
jenkins.test_result('OOP-Hw1C++_105598054-UT', '1', function (err, data) {
  if (err) { return console.log(err) }
  console.log(data)

  let suite = JSON.stringify(data.suites[1].cases)
  let errorDetails = JSON.parse(suite)[0].errorDetails
  let errorStackTrace = JSON.parse(suite)[0].errorStackTrace
  console.log('\n')
  console.log(errorDetails)
  console.log('\n')
  console.log(errorStackTrace)
  console.log('\n')
})

// 用來拿 build-number
// jenkins.last_build_info('OOP-Hw1C++_105598054-UT', function (err, data) {
//   if (err) { return console.log(err) }
//   console.log(data)
// })
