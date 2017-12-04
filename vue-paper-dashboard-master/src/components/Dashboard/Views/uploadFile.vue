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
    <div class="example-btn">
        <file-upload
          class="btn btn-primary"
          post-action="http://localhost:3000/upload"
          extensions="gzip,7z,tar,xz,zip,rar"
          accept=".gzip,.7z,.tar,.xz,.zip,.rar"
          :size="1024 * 1024 * 1024"
          v-model="files"
          ref="upload">
          <i class="fa fa-plus"></i>
          選擇作業
        </file-upload>
          <button type="button" class="btn btn-success" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
            開始上傳
          </button>
          <button type="button" class="btn btn-danger"  v-else @click.prevent="$refs.upload.active = false">
            <i class="fa fa-stop" aria-hidden="true"></i>
            停止上傳
          </button>
    </div>
  </div>
</template>
<script>
import FileUpload from 'vue-upload-component'
export default {
  components: {
    FileUpload
  },
  data () {
    return {
      files: []
    }
  }
}
</script>
