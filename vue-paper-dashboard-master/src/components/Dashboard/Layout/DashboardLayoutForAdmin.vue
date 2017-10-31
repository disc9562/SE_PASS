<template>
  <div class="wrapper">
    <side-bar-for-admin type="sidebar" :sidebar-links="$sidebarforadmin.sidebarLinks2">

    </side-bar-for-admin>
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
  import TopNavbar from './TopNavbarForAdmin.vue'
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
        if (this.$sidebarforadmin.showSidebar) {
          this.$sidebarforadmin.displaySidebar(false)
        }
      }
    }
  }

</script>
