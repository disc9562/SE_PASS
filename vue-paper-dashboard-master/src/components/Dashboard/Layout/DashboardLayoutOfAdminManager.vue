<template>
  <div class="wrapper">
    <side-bar-for-account type="sidebar" :sidebar-links="$sidebarofaccount.sidebarLinksOfAccount">

    </side-bar-for-account>
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
  import TopNavbar from './TopNavbarOfAdminManager.vue'
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
        if (this.$sidebarofaccount.showSidebar) {
          this.$sidebarofaccount.displaySidebar(false)
        }
      }
    }
  }

</script>
