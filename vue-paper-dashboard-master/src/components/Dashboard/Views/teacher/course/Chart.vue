<script>
import {Pie} from 'vue-chartjs'
export default {
  extends: Pie,
  mounted () {
    this.renderChart({
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
          data: [10, 15, 8, 8, 9, 10]
        }
      ]
    }, {responsive: true, maintainAspectRatio: false})
  }
}
</script>
