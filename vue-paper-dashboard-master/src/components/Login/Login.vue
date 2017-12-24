<template>
<div class="container">
	<div style="align-items:center;justify-content:center;display:flex;">
		<img src="./books-1316306_960_720.png" style="width:40%;height:40%;"></img>
  </div>
	<div style="align-items:center;justify-content:center;display:flex;">
		<img src="./allPass.png"></img>
  </div>		
			<div class="row">	
			<div class="col-md-6 col-md-offset-3">
				<div class="panel panel-login">
					<div class="panel-body">
						<div class="row">
							<div class="col-lg-12">
								<form id="login-form"  role="form" style="display: block;" v-on:submit.prevent="login">
									<div class="form-group">
										<input type="text" name="username" id="username" tabindex="1" class="form-control" placeholder="Account" value="" v-model="account">
									</div>
									<div class="form-group">
										<input type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Password" v-model="password">
									</div>
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<button name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" data-loading-text="<i class='fa fa-circle-o-notch fa-spin' ></i> 登入中">Log In</button>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
			</div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'
export default{
  data () {
    return {
      account: '',
      password: ''
    }
  },
  mounted () {
    this.init()
  },
  methods: {
    init () {
      this.actionLogout()
    },
    login () {
      if (this.account === 'admin') {
        this.$router.push({
          path: '/account'
        })
      } else {
        axios.post('http://localhost:9090/api/login', {
          id: this.account,
          password: this.password
        }).then((result) => {
          this.actionLogin(result.data[0])
          if (result.data[0].role[0] === 'teacher') {
            this.$router.push({
              path: '/teacher'
            })
          } else if (result.data[0].role[0] === 'student') {
            this.$router.push({
              path: '/student/' + result.data[0]._id
            })
          }
        }).catch((err) => {
          console.log(err)
        })
      }
    },
    ...mapActions(['actionLogin', 'actionLogout'])
  }
}
</script>
<style src="./Login.css">
