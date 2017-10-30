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
									<!-- <div class="form-group text-center">
										<input type="checkbox" tabindex="3" class="" name="remember" id="remember">
										<label for="remember"> Remember Me</label>
									</div> -->
									<div class="form-group">
										<div class="row">
											<div class="col-sm-6 col-sm-offset-3">
												<button name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" data-loading-text="<i class='fa fa-circle-o-notch fa-spin' ></i> 登入中">Log In</button>
												<!-- <router-link :to="{path:'/admin/Course'}"><button name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" data-loading-text="<i class='fa fa-circle-o-notch fa-spin' ></i> 登入中">Log In</button></router-link> -->
											</div>
										</div>
									</div>
									<!-- <div class="form-group">
										<div class="row">
											<div class="col-lg-12">
												<div class="text-center">
													<a href="https://phpoll.com/recover" tabindex="5" class="forgot-password">Forgot Password?</a>
												</div>
											</div>
										</div> -->
									<!-- </div> -->
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

export default{
  data () {
    return {
      account: '',
      password: ''
    }
  },

  methods: {
    login () {
      if (this.account === 'teacher') {
        this.$router.push({
          path: '/admin/Course'
        })
      } else if (this.account === 'student') {
        this.$router.push({
          path: '/homework'
        })
      } else if (this.account === 'admin') {
        this.$router.push({
          path: '/account'
        })
      }
    }
  }
}
</script>
<style src="./Login.css">
