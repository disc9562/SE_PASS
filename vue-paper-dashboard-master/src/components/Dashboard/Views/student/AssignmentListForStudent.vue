<template>
    <div class="row">
      <div class="col-md-12">
           <assignment-table :apiUrl="this.apiUrl"></assignment-table>
      </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import assignmentTable from './assignmentTable'
export default {
  components: {
    assignmentTable
  },
  computed: {
    ...mapGetters({apiUrl: 'getCourseUrl'})
  }
}
</script>
