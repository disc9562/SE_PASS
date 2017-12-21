<template>
    <div class="row">
      <div class="col-md-12">
           <student-table :apiUrl="this.apiUrl" :id="this.id"></student-table>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StudentTable from './StudentTable'
export default {
  components: {
    StudentTable
  },
  computed: {
    ...mapGetters({apiUrl: 'getCourseUrl', id: 'getId'})
  }
}
</script>
