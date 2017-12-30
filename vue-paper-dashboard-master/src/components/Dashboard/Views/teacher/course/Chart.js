import {Pie, mixins} from 'vue-chartjs'
import axios from 'axios'
const {reactiveData} = mixins
export default {
  extends: Pie,
  mixins: [reactiveData],
  data () {
    return {
      datacollection: {
        labels: ['fail', '60~69', '70~79', '80~89', '90~99', '100'],
        datasets: [
          {
            backgroundColor: [
              '#bab7b6',
              '#ba1bb7',
              '#41B883',
              '#E46651',
              '#00D8FF',
              '#DD1B16'
            ],
            data: []
          }
        ]
      }
    }
  },
  mounted () {
    console.log(this.$route.params.assignmentId)
    axios.get('http://localhost:9090/api/getAllStudentGradeByAssignmentId', { params: {
      assignmentId: this.$route.params.assignmentId
    }}).then((result) => {
      let grade = result.data.grade
      Object.keys(grade).forEach((element, index) => {
        this.datacollection.datasets[0].data.push(grade[element])
      })
    }).catch((err) => {
      console.log(err)
    })
    this.renderChart(this.datacollection, {responsive: true, maintainAspectRatio: false})
  },
  watch: {
    datacollection: function (newdata) {
      console.log(newdata)
    }
  }
}
