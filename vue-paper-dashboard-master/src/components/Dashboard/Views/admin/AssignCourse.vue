 <template>
<div class= "row">
  <div class= "row">
    <div class="col-sm-6">
       <h5>Step1: 選擇課程</h5>
        <div class="well" style="overflow-y: scroll;max-height: 40vh;">
          <div class="btn-group-vertical" style="width: 100%">
            <ul>
            <li v-for="(course, id) in courselist" :key="id" >
             <input type="checkbox" :id="id" :value="course._id" v-model="choosedcourse">{{course.coursename}}
            </li>
            </ul>
          </div>
        </div>
    </div>
    <div class="col-sm-6">
         <h5>Step2: 選擇學生(可多選)</h5>
        <div class="well" style="overflow-y: scroll;max-height: 40vh;">
          <div class="btn-group-vertical" style="width: 100%">
            <ul>
            <li v-for="(student,id) in studentlist" :key="id"> 
            <input type="checkbox"  :id="id" :value="student.id" v-model="choosedstudentlist">{{student.username}}
            </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
  <div class="row">
     <div class="col-sm-12">
       <button type="button" class="btn btn-default" style="float:right" @click="submit()">送出表單
      </button>
    </div>
  </div>
</div>
</template>
<script>
const axios = require('axios')
export default {
  data () {
    return {
      courselist: [],
      studentlist: [],
      choosedstudentlist: [],
      choosedcourse: []

    }
  },
  mounted () {
    axios.get('http://localhost:9090/api/getAllCourse')
    .then((result) => {
      result.data.data.forEach(course => {
        this.courselist.push(course)
      })
    })
    .catch((err) => {
      console.log(err)
    })
    axios.get('http://localhost:9090/api/getAccountListByRole?role=student')
     .then((result) => {
       result.data.data.forEach(student => {
         this.studentlist.push(student)
       })
     })
    .catch((err) => {
      console.log(err)
    })
  },
  methods: {
    cancel () {
      this.$router.push({
        path: '/account/allCourseList'
      })
    },
    submit () {
      axios.post('http://localhost:9090/api/addStudentIntoCourse', {
        courseId: this.choosedcourse[0],
        studentId: this.choosedstudentlist[0]
      }).then((result) => {
        console.log(result)
          // result.data.data.forEach(student => {
          //   this.studentlist.push(student)
          // })
      })
      .catch((err) => {
        console.log(err)
      })
      this.init()
    },
    init () {
      this.choosedcourse = []
      this.choosedstudentlist = []
    }

  }

}
</script>
