<template>
  <div class="row">
      <div class="col-md-12">
        <chart ></chart>
      </div>
    </div>
</template>
<script>
import chart from './Chart'
import {mapGetters} from 'vuex'
import axios from 'axios'
export default {
  components: {
    chart
  },
  computed: {
    ...mapGetters({assignmentId: 'getAssignmentId'})
  },
  mounted () {
    console.log(this.$route.params.assignmentId)
    axios.get('http://localhost:9090/api/getAllStudentGradeByAssignmentId', { params: {
      assignmentId: this.$route.params.assignmentId
    }}).then((result) => {
      console.log(result)
    }).catch((err) => {
      console.log(err)
    })
  }
}
</script>
