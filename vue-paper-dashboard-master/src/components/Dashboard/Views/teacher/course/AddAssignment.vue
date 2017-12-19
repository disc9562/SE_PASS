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
let axios = require('axios')
export default {
  data () {
    return {
      // courseId: undefined,
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
        console.log(response)
        this.$router.push({
          path: 'assignmentList'
        })
      }).catch((err) => {
        console.log(err)
      })
    }
  },
  computed: {
    ...mapGetters({courseId: 'getCourseId'})
  /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  }

}
</script>
