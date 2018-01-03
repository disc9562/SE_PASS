<template>
  <div class="wrapper">
    <side-bar-of-assignment type="sidebar" :sidebar-links="$sidebarofassignment.sidebarLinksOfAssignment">
    </side-bar-of-assignment>
    <notifications>

    </notifications>
    <div class="main-panel">
      <top-navbar></top-navbar>

      <dashboard-content @click.native="toggleSidebar">

      </dashboard-content>

      <content-footer></content-footer>
    </div>
  </div>
</template>
<style lang="scss">

</style>
<script>
  import TopNavbar from './TopNavbarOfCourseManager.vue'
  import ContentFooter from './ContentFooter.vue'
  import DashboardContent from './Content.vue'
  export default {
    components: {
      TopNavbar,
      ContentFooter,
      DashboardContent
    },
    methods: {
      toggleSidebar () {
        if (this.$sidebarofassignment.showSidebar) {
          this.$sidebarofassignment.displaySidebar(false)
        }
      }
    }
  }

</script>
