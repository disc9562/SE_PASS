<template>
  <div class="wrapper">
    <side-bar-for-student type="sidebar" :sidebar-links="$sidebarforstudent.sidebarLinks4">

    </side-bar-for-student>
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
  import TopNavbar from './TopNavbarForStudent.vue'
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
        if (this.$sidebarforstudent.showSidebar) {
          this.$sidebarforstudent.displaySidebar(false)
        }
      }
    }
  }

</script>
