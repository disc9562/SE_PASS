<template>
    <form @submit.prevent="addCourse()">
      <div class="form-group">
        <label for="coursename">課程名稱</label>
        <input class="form-control" id="coursename"  v-model="coursename">
        <label for="courseteacher">授課教師</label>
        <select id="courseteacher" class="form-control" v-model="selectTeacher"> 
          <option v-for="(name, code) in courseteacher" :value="name" :key="code">{{ name }}</option>
        </select>
        <label for="classtime">課程時間</label>
        <input type="text" class="form-control" id="classtime" v-model="classtime">
        <label for="population">課程人數上限</label>
        <input type="text" class="form-control" id="population" v-model="population">
      </div>
      <div class="form-group">
        <label for="coursedescription">作業描述</label>
        <textarea class="form-control" id="coursedescription" rows="3" v-model="coursedescription"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">新增課程</button>
    </form>  
</template>
<script>
const axios = require('axios')
export default {
  data () {
    return {
      coursename: undefined,
      courseteacher: [],
      classtime: undefined,
      coursedescription: undefined,
      population: undefined,
      selectTeacher: undefined
    }
  },
  mounted () {
    axios.get('http://localhost:9090/api/getAccountListByRole?role=teacher')
    .then((result) => {
      console.log(result.data.data)
      result.data.data.forEach(teacher => {
        this.courseteacher.push(teacher.username)
      })
      console.log(this.courseteacher)
    })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    initForm () {
      this.coursename = ''
      this.selectTeacher = ''
      this.classtime = ''
      this.coursedescription = ''
      this.population = ''
    },
    addCourse () {
      axios.post('http://localhost:9090/api/addCourseSE', {
        coursename: this.coursename,
        courseteacher: this.selectTeacher,
        classtime: this.classtime,
        population: this.population,
        coursedescription: this.coursedescription
      })
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
