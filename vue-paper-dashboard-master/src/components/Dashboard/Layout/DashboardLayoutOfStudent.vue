<template>
  <div class="wrapper">
    <side-bar-of-student type="sidebar" :sidebar-links="$sidebarofstudent.sidebarLinksOfStudent">
    </side-bar-of-student>
    <notifications>

    </notifications>
    <div class="main-panel">
      <top-navbar-of-student></top-navbar-of-student>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import TopNavbarOfStudent from './TopNavbarOfCourseStudent.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  export default {
    components: {
      TopNavbarOfStudent,
      ContentFooter,
      DashboardContent
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebarofstudent.showSidebar) {
          this.$sidebarofstudent.displaySidebar(false)
        }
      }
    }
  }

</script>
