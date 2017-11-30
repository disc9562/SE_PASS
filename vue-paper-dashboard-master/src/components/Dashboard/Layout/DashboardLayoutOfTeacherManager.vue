<template>
  <div class="wrapper">
    <side-bar-of-course type="sidebar" :sidebar-links="$sidebarofcourse.sidebarLinksOfCourse">

    </side-bar-of-course>
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
  import TopNavbar from './TopNavbarOfTeacherManager.vue'
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
        if (this.$sidebarofcourse.showSidebar) {
          this.$sidebarofcourse.displaySidebar(false)
        }
      }
    }
  }

</script>
