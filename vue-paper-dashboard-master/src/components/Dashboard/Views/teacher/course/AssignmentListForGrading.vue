<template>
<div class="row">
  <assignment-list-for-grading-table :assignment="this.assignmentName" :courseNameBefore="this.courseNameBefore" :apiUrl="this.apiUrl"> </assignment-list-for-grading-table>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import AssignmentListForGradingTable from './AssignmentListForGradingTable'
export default {
  components: {
    AssignmentListForGradingTable
  },
  computed: {
    ...mapGetters({apiUrl: 'getAssignmentUrl', assignmentName: 'getAssignmentName', courseNameBefore: 'getCourseName'})
  }
}
</script>
