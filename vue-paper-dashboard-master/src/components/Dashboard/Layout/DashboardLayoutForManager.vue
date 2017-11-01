<template>
  <div class="wrapper">
    <side-bar-for-manager type="sidebar" :sidebar-links="$sidebar.sidebarLinks3">

    </side-bar-for-manager>
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
  import TopNavbar from './TopNavbarForManager.vue'
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
        if (this.$sidebarformanager.showSidebar) {
          this.$sidebarformanager.displaySidebar(false)
        }
      }
    }
  }

</script>
