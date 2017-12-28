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
import jenkins from '../../../../../main/jenkins'
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
      axios.post('http://localhost:9090/api/addAssignment', {
        assignmentname: this.assignmentName,
        courseid: this.courseId,
        deadline: this.deadline,
        assignmentdescription: this.assignmentDescription
      })
      .then((response) => {
        this.$router.push({
          path: 'assignmentList'
        })
        let data = JSON.parse(response.config.data)
        console.log(`[ID] ${data.courseid}`)
        jenkins.createJob(data.courseid
                        , this.courseName
                        , data.assignmentname)
      })
      .catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters({courseId: 'getCourseId', courseName: 'getCourseName'})
  }

}
</script>
