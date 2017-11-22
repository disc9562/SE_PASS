<template>
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <div class="navbar-header">
        <button type="button" class="navbar-toggle" :class="{toggled: $sidebar.showSidebar}" @click="toggleSidebar">
          <span class="sr-only">Toggle navigation</span>
          <span class="icon-bar bar1"></span>
          <span class="icon-bar bar2"></span>
          <span class="icon-bar bar3"></span>
        </button>
        <a class="navbar-brand">{{routeName}}</a>
      </div>
         <div class="table-button-container" style="float:right;">
              <button class="btn btn-warning btn-sm" @click="addcourse()">
              <span class="glyphicon glyphicon-plus"></span> 新增課程</button>
             <button class="btn btn-primary btn-sm" @click="teacherProfile()">
              <span class="glyphicon glyphicon-user"></span> 設定個人資料</button>
       </div>
    </div>
  </nav>
</template>
<script>
  export default {
    computed: {
      routeName () {
        const {name} = this.$route
        return this.capitalizeFirstLetter(name)
      }
    },
    data () {
      return {
        activeNotifications: false
      }
    },
    methods: {
      capitalizeFirstLetter (string) {
        return string.charAt(0).toUpperCase() + string.slice(1)
      },
      toggleNotificationDropDown () {
        this.activeNotifications = !this.activeNotifications
      },
      closeDropDown () {
        this.activeNotifications = false
      },
      toggleSidebar () {
        this.$sidebar.displaySidebar(!this.$sidebar.showSidebar)
      },
      hideSidebar () {
        this.$sidebar.displaySidebar(false)
      },
      teacherProfile () {
        this.$router.push({
          path: '/teacher/profile'
        })
      },
      addcourse () {
        this.$router.push({
          path: '/teacher/addcourse'
        })
      }
    }
  }

</script>
<style>

</style>
