<template>
<div class="card">
       <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="apiUrl">
            <template slot="actions" scope="props">
                    <div class="table-button-container">
                      <div class="row">
                         <div class = "col-sm-5">
                         <button class="btn btn-info btn-sm " id="get_file" value="Grab file" @click="relationToFile()">
                         <span class="glyphicon glyphicon-cloud-upload"></span> 選擇測試腳本</button>
                         <button class="btn btn-success btn-sm" @click="viewReport(props.rowData)">
                         <span class="glyphicon glyphicon-stats"></span> 查看報表</button>
                        <input type="file" id="chooseScript" style="opacity: 0; overflow: hidden;width:0.1px;height:0.1px;" accept="file_extension"  class="inputfile" v-on:change="uploadTestScript" />                         
                        </div>
                         <div class = "col-sm-7">
                         <input type="text" class="form-control" id="scriptPath" size="5" disabled="disabled">
                         </div>
                       </div>
                    </div>
            </template>
            <template slot="actions2" scope="props">
                      <div class="table-button-container">
                        <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                          <span class="glyphicon glyphicon-trash"></span> 刪除</button>
                      </div>
             </template>
          </vuetable>
         <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
</template>
<script>
export default {
  data () {
    return {
      fields: [
        {
          name: 'assignmentname',
          title: '<span class="orange glyphicon glyphicon-pencil"></span> 作業名稱',
          sortField: 'assignmentname'
        },
        {
          name: 'deadline',
          title: '<span class="orange fa fa-history"></span> 繳交期限',
          sortField: 'deadline'
        },
        {
          name: 'assignmentdescription',
          title: '<span class="orange glyphicon glyphicon-time"></span> 作業描述',
          sortField: 'assignmentdescription'
        },
        '__slot:actions',
        '__slot:actions2'
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
  props: ['apiUrl'],
  mounted () {
    console.log('*****************************')
    console.log(this.apiUrl)
  },
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    uploadTestScript (event) {
      var scriptFile = event.target.files[0]
      document.getElementById('scriptPath').value = scriptFile.name
    },
    deleteRow (rowData) {
      alert('You clicked delete on' + JSON.stringify(rowData))
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    relationToFile () {
      document.getElementById('chooseScript').click()
    }
  }
}
</script>
