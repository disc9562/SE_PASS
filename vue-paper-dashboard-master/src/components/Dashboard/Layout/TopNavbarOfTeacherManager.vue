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
        <a class="navbar-brand">{{userName}}老師，您好</a>
      </div>
          <ul class="nav navbar-nav navbar-right">
            <li @click="logout()" class="open">
            <a href="#" class="dropdown-toggle btn-magnify" data-toggle="dropdown">
              <i class="ti-shift-right"></i>
              <p>登出</p>
            </a>
          </li>
        </ul>
    </div>
  </nav>
</template>
<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters({userName: 'getUser'}),
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
    logout () {
      this.$router.push({
        path: '/'
      })
    }
  }
}

</script>
<style>

</style>
