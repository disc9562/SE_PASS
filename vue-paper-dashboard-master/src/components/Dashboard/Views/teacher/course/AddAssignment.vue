<template>
<form @submit.prevent="addAssignment()">
  <div class="form-group">
		<label for="assignmentName">作業名稱</label>
    <input class="form-control" v-model="assignmentName" id="assignmentName">
    <label for="deadline">繳交期限</label>
    <input type="date" class="form-control" v-model="deadline" id="deadline">
  </div>
  <div class="form-group">
    <label for="assignmentDescription">作業描述</label>
    <textarea class="form-control" id="assignmentDescription" v-model="assignmentDescription" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-primary">新增作業</button>
</form>  
</template>

<script>
import { mapGetters } from 'vuex'
import {Querystring} from 'request/lib/querystring.js'
import jenkinsApi from 'jenkins-api'
let jenkins = jenkinsApi.init('http://sepass:lab1321@140.124.181.81:8080')
const jobPath = 'C:\\Users\\jay\\seWorkSpace'
Querystring.prototype.unescape = function (val) { return val }
let axios = require('axios')

export default {
  data () {
    return {
      assignmentName: undefined,
      deadline: undefined,
      assignmentDescription: undefined
    }
  },
  methods: {
    addAssignment () {
      let assignmentName
      axios.post('http://localhost:9090/api/addAssignment', {
        assignmentname: this.assignmentName,
        courseid: this.courseId,
        deadline: this.deadline,
        assignmentdescription: this.assignmentDescription
      })
      .then((response) => {
        let result = JSON.parse(response.config.data)
        this.$router.push({
          path: 'assignmentList'
        })
        return result
      })
      .then((result) => {
        assignmentName = result.assignmentname
        axios.get('http://localhost:9090/api/getStudentsList?courseId=' + result.courseid)
        .then((res) => {
          let studentList = res.data.data
          studentList.forEach(student => {
            jenkins.create_job(`${this.courseName}_${assignmentName}_${student.id}`
                          , this.initXML(jobPath, this.courseName, assignmentName, student.id)
                          , function (err, data) {
                            if (err) {
                              console.log(err)
                            } else {
                              console.log(data)
                            }
                          })
          })
        })
      })
      .catch((err) => {
        console.log(err)
      })
    },
    initXML (jobPath, courseName, homeworkName, studentId) {
      console.log(courseName, homeworkName, studentId)

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
  <publishers/>
  <buildWrappers/>
</project>`
      return xml
    }
  },
  computed: {
    ...mapGetters({courseId: 'getCourseId', courseName: 'getCourseName'})
  }
}
</script>
