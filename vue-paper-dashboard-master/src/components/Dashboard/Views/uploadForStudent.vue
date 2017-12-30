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
          post-action="http://localhost:9090/uploadByStudent"
          :data="data"
          extensions="gzip,7z,tar,xz,zip,rar"
          accept=".gzip,.7z,.tar,.xz,.zip,.rar"
          :size="1024 * 1024 * 1024"
          v-model="files"
          ref="upload">
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
  }
}
</script>
