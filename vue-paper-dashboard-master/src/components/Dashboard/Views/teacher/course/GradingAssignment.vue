<template>
<form @submit.prevent="grading()">
  <div class="form-group">
    <label for="score">分數</label>
    <input type="text" class="form-control" id="score" v-model="score">
  </div>
  <div class="form-group">
    <label for="description">評語</label>
    <textarea class="form-control" id="description" rows="3" v-model="description"></textarea>
  </div>
  <button type="submit" class="btn btn-primary" >儲存</button>
  <button type="submit" class="btn btn-primary" @click="cancel()">取消</button>
</form>  
</template>
<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
export default {
  data () {
    return {
      score: '',
      description: ''
    }
  },
  methods: {
    cancel () {
      this.$router.push({
        path: '/teacher/Course/assignmentListForGrading'
      })
    },
    grading () {
      axios.post('http://140.124.181.81:9090/api/updateAssignmentGrade', {
        studentId: this.studentId,
        score: this.score,
        description: this.description,
        studentName: this.studentName,
        assignmentName: this.assignmentName,
        courseId: this.courseId
      })
      this.$router.push({
        path: `/teacher/Course/${this.assignmentName}/assignmentListForGrading`
      })
    }
  },
  computed: {
    ...mapGetters({studentId: 'getStudentId', studentName: 'getStudent', assignmentName: 'getAssignmentName', courseId: 'getCourseId'})
  }
}
</script>
