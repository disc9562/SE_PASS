<template>
    <div class="row">
      <div class="col-md-12">
           <assignment-table :apiUrl="this.apiUrl" :courseid="this.courseid"></assignment-table>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import AssignmentTable from './AssignmentTable'
export default {
  components: {
    AssignmentTable
  },
  computed: {
    ...mapGetters({apiUrl: 'getCourseUrl', courseid: 'getCourseId'})
  }
}
</script>
