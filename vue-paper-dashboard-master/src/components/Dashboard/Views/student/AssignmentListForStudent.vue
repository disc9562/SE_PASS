<template>
    <div class="row">
      <div class="col-md-12">
         <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" api-url="https://vuetable.ratiw.net/api/users">
            <template slot="actions" scope="props">
                <div class="table-button-container">
                    <div class="upload">
                      <ul>
                        <li v-for="(file, index) in files" :key="file.id">
                          <span>{{file.name}}</span> -
                          <span>{{file.size}}</span> -
                          <span v-if="file.error">{{file.error}}</span>
                          <span v-else-if="file.success">success</span>
                          <span v-else-if="file.active">active</span>
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
                          @input-filter="inputFilter"
                          @input-file="inputFile"
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
                </div> 
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
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
      files: [],
      fields: [
        {
          name: 'name',
          title: '<span class="orange glyphicon glyphicon-pencil"></span> 作業名稱',
          sortField: 'name'
        },
        {
          name: 'email',
          title: '<span class="orange fa fa-history"></span> 繳交情況',
          sortField: 'email'
        },
        {
          name: 'gender',
          title: '<span class="orange glyphicon glyphicon-time"></span> 繳交期限',
          sortField: 'gender'
        },
        '__slot:actions'
      ],
      sortOrder: [
      { field: 'name', direction: 'asc' }
      ],
      css: {
        table: {
          tableClass: 'table table-striped table-bordered table-hovered',
          loadingClass: 'loading',
          ascendingIcon: 'glyphicon glyphicon-chevron-up',
          descendingIcon: 'glyphicon glyphicon-chevron-down',
          handleIcon: 'glyphicon glyphicon-menu-hamburger'
        },
        pagination: {
          infoClass: 'pull-left',
          wrapperClass: 'vuetable-pagination pull-right',
          activeClass: 'btn-primary',
          disabledClass: 'disabled',
          pageClass: 'btn btn-border',
          linkClass: 'btn btn-border',
          icons: {
            first: '',
            prev: '',
            next: '',
            last: ''
          }
        }
      }
    }
  },
  computed: {
  /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    uploadAssignment (event) {
      var assignmentFile = event.target.files[0]
      document.getElementById('assignmentPath').value = assignmentFile.name
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    relationToFile () {
      document.getElementById('chooseAssignment').click()
    },
    inputFilter (newFile, oldFile, prevent) {
      if (newFile && !oldFile) {
        // Before adding a file
        // Filter system files or hide files
        if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
          return prevent()
        }
        // Filter php html js file
        if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
          return prevent()
        }
      }
    },
    inputFile (newFile, oldFile) {
      if (newFile && !oldFile) {
        console.log('add', newFile)
      }
      if (newFile && oldFile) {
        console.log('update', newFile)
      }
      if (!newFile && oldFile) {
        console.log('remove', oldFile)
      }
    }
  }
}
</script>
