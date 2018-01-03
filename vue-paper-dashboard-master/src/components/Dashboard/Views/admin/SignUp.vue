<template>
   	<div class="container">

				<div class="main-login main-center">
					<form class="form-horizontal" method="post"  @submit.prevent="register()" action="#">
						
						<div class="form-group">
							<label for="username" class="cols-sm-2 control-label">ID</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-users fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" v-model="accountId" name="username" id="username"  placeholder="Enter your ID"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="name" class="cols-sm-2 control-label">User Name</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-user fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control"	v-model="userName" name="name" id="name"  placeholder="Enter your User Name"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="password" class="cols-sm-2 control-label">Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" v-model="password" name="password" id="password"  placeholder="Enter your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="confirm" class="cols-sm-2 control-label">Confirm Password</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-lock fa-lg" aria-hidden="true"></i></span>
									<input type="password" class="form-control" v-model="confirmPwd" name="confirm" id="confirm"  placeholder="Confirm your Password"/>
								</div>
							</div>
						</div>

						<div class="form-group">
							<label for="email" class="cols-sm-2 control-label">Email</label>
							<div class="cols-sm-10">
								<div class="input-group">
									<span class="input-group-addon"><i class="fa fa-envelope fa" aria-hidden="true"></i></span>
									<input type="text" class="form-control" v-model="email"	name="email" id="email"  placeholder="Enter your Email"/>
								</div>
							</div>
						</div>

            <div class="form-group">
              <select  v-model="role">
                <option value="student">student</option>
                <option value="teacher">teacher</option>								
              </select>
              </div>
						<div class="form-group ">
							<button type="submit" class="btn btn-primary btn-lg btn-block login-button">Register</button>
						</div>
					</form>
				</div>
		</div>
</template>
<script>
const axios = require('axios')
export default {
  data () {
    return {
      accountId: undefined,
      userName: undefined,
      password: undefined,
      confirmPwd: undefined,
      email: undefined,
      role: 'student'
    }
  },
  methods: {
    initForm () {
      this.accountId = ''
      this.userName = ''
      this.password = ''
      this.confirmPwd = ''
      this.email = ''
      this.role = 'student'
    },
    register () {
      if (this.confirmPwd !== this.password) {
        alert('密碼不一致')
        return
      }
      axios.post('http://140.124.181.81:9090/api/signupSE', {
        id: this.accountId,
        username: this.userName,
        password: this.password,
        email: this.email,
        role: this.role})
        .then((response) => {
          console.log(response)
          this.initForm()
          // location.reload()
        }).catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style>
/*
/* Created by Filipe Pina
 * Specific styles of signin, register, component
 */
/*
 * General styles
 */

body, html{
     height: 100%;
 	background-repeat: no-repeat;
 	background-color: #d3d3d3;
 	font-family: 'Oxygen', sans-serif;
}

.main{
 	margin-top: 70px;
}

h1.title { 
	font-size: 50px;
	font-family: 'Passion One', cursive; 
	font-weight: 400; 
}

hr{
	width: 10%;
	color: #fff;
}

.form-group{
	margin-bottom: 15px;
}

label{
	margin-bottom: 15px;
}

input,
input::-webkit-input-placeholder {
    font-size: 11px;
    padding-top: 3px;
}

.main-login{
 	background-color: #fff;
    /* shadows and rounded borders */
    -moz-border-radius: 2px;
    -webkit-border-radius: 2px;
    border-radius: 2px;
    -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);

}

.main-center{
 	margin-top: 30px;
 	margin: 0 auto;
 	max-width: 330px;
    padding: 40px 40px;

}

.login-button{
	margin-top: 5px;
}

.login-register{
	font-size: 11px;
	text-align: center;
}

</style>
