<template>
<div class="row">
  <assignment-list-for-grading-table :apiUrl="this.apiUrl"> </assignment-list-for-grading-table>
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
    ...mapGetters({apiUrl: 'getAssignmentUrl'})
  }
}
</script>
