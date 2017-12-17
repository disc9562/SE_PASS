<template>
    <div class="row">
      <div class="col-md-12">
       <course-table :apiUrl="this.apiUrl"></course-table>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import CourseTable from './CourseTable'
export default {
  components: {
    CourseTable
  },
  computed: {
    ...mapGetters({apiUrl: 'getUrl'})
  /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  }
}
</script>
