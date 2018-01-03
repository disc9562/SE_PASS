<template>
  <div class="upload">
    <ul>
        <li v-for="(file, index) in files" :key="file.id">
          <span>{{file.name}}</span>
          <!-- <span>{{file.size}}</span> - -->
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success"> - 上傳成功</span>
          <span v-else-if="file.active"> - 上傳中</span>
          <span v-else></span>
        </li>
    </ul>
        <file-upload
          class="btn btn-primary btn-sm"
          post-action="http://140.124.181.81:9090/uploadByStudent"
          :data="data"
          extensions="gzip,7z,tar,xz,zip,rar"
          accept=".gzip,.7z,.tar,.xz,.zip,.rar"
          :size="1024 * 1024 * 1024"
          ref="upload"
          v-model="files"
          >
          <i class="fa fa-plus"></i>
          選擇作業
        </file-upload>
          <button type="button" class="btn btn-success btn-sm" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
            開始上傳
          </button>
          <button type="button" class="btn btn-danger btn-sm"  v-else @click.prevent="$refs.upload.active = false">
            <i class="fa fa-stop" aria-hidden="true"></i>
            停止上傳
          </button>
  </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
import axios from 'axios'
import swal from 'sweetalert2'
let template
let amount = 0
export default {
  components: {
    FileUpload
  },
  props: ['assignmentName', 'courseName', 'studentId', 'courseId'],
  data () {
    return {
      data: {
        'assignmentName': this.assignmentName,
        'courseName': this.courseName,
        'studentId': this.studentId,
        'courseId': this.courseId
      },
      files: []
    }
  },
  mounted () {
    template = this
  },
  methods: {
    getLastBuildInfo: function (jobName, queueId) {
      axios.get('http://140.124.181.81:9090/getjenkinsJobInfo', {params: {queueId: queueId}})
          .then(function (response) {
            if (response.data.result.why !== null && amount < 10) {
              console.log(`${response.data.result.why}`)
              console.log(amount)
              amount++
              template.sleep(3000)
              template.getLastBuildInfo(jobName, queueId)
            } else {
              console.log(`${response.data.result.why}`)
              amount = 0
              let number = response.data.result.executable.number
              let report = `<h2><a target="_blank" href="//140.124.181.81:8080/job/${jobName}/${number}/cucumber-html-reports/overview-features.html">報表</a></h2>`
              swal({
                type: 'success',
                title: '完成批改',
                html: report,
                showConfirmButton: true
              })
            }
          })
    },
    sleep: function (sleepTime) {
      for (var start = +new Date(); +new Date() - start <= sleepTime;) {}
    }
  },
  watch: {
    files: function (val) {
      if (val[0].success) {
        let jobName = this.courseName + '_' + this.assignmentName + '_' + this.studentId
        axios.post('http://140.124.181.81:9090/jenkinsBuild', {'jobName': jobName})
        .then(function (response) {
          let queueId = response.data.result.queueId
          template.getLastBuildInfo(jobName, queueId)
        })
        .catch(function (err) {
          console.log(err)
        })
      }
    }
  }
}
</script>
