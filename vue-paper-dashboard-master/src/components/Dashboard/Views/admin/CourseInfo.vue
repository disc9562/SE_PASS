<template>
    <div class="row">
      <div class="col-md-12">
       <course-info-table :getStudentUrl="this.getStudentUrl" :getCourseId="this.getCourseId"></course-info-table>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseInfoTable from './CourseInfoTable'
export default {
  components: {
    CourseInfoTable
  },
  computed: {
    ...mapGetters({getStudentUrl: 'getStudentUrl', getCourseId: 'getCourseId'})
  /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  }
}
</script>
