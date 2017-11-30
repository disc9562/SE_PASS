<template>
    <div class="row">
      <div class="col-md-12">
         <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" api-url="https://vuetable.ratiw.net/api/users">
            <template slot="actions" scope="props">
              <div class="row">
                <div class="table-button-container">
                  <div class="col-sm-4">
                    <button class="btn btn-info btn-sm " id="get_file" value="Grab file" @click="relationToFile()">
                     <span class="glyphicon glyphicon-cloud-upload"></span> 上傳作業</button>
                    <input type="file" id="chooseAssignment" style="opacity: 0; overflow: hidden;width:0.1px;height:0.1px;" accept="file_extension"  class="inputfile" v-on:change="uploadAssignment" />                 
                  </div>
                  <div class="col-sm-8">
                    <input type="text" class="form-control" id="assignmentPath" size="5" disabled="disabled">
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
export default {
  data () {
    return {
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
    }
  }
}
</script>
