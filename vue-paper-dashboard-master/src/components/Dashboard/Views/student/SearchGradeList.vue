<template>
    <div class="row">
      <div class="col-md-12">
           <search-grade-table :url="this.url" :apiUrl="this.apiUrl" :studentId="this.studentId"></search-grade-table>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import SearchGradeTable from './SearchGradeTable'
export default {
  data () {
    return {
      url: undefined
    }
  },
  components: {
    SearchGradeTable
  },
  computed: {
    ...mapGetters({apiUrl: 'getStudentAssignmentUrl', studentId: 'getId'})
  }
}
</script>
