<template>
<div class="card">
       <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="10" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="apiUrl">
            <template slot="actions" scope="props">
              <div class="table-button-container">
                  <uploadFile :assignmentName="props.rowData.assignmentname" :courseName="courseName"></uploadFile>
              </div>
            </template>
            <template slot="actions2" scope="props">
              <div class="table-button-container">
                <button class="btn btn-success btn-sm" @click="enterAssignment(props.rowData)">
                <span class="glyphicon glyphicon-stats"></span> 作業批改</button>
                <button class="btn btn-success btn-sm" @click="viewReport(props.rowData)">
                <span class="glyphicon glyphicon-stats"></span> 查看報表</button>
              </div>
            </template>
            <template slot="actions3" scope="props">
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
import axios from 'axios'
import uploadFile from '../../uploadFile.vue'
import {mapGetters, mapActions} from 'vuex'
export default {
  components: {
    uploadFile
  },
  data () {
    return {
      fields: [
        {
          name: 'assignmentname',
          title: '<span class="orange glyphicon glyphicon-pencil"></span> 作業名稱'
        },
        {
          name: 'deadline',
          title: '<span class="orange fa fa-history"></span> 繳交期限'
        },
        {
          name: 'assignmentdescription',
          title: '<span class="orange glyphicon glyphicon-time"></span> 作業描述'
        },
        '__slot:actions',
        '__slot:actions2',
        '__slot:actions3'
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
    ...mapGetters({courseName: 'getCourseName'})
  },
  props: ['apiUrl', 'courseid'],
  mounted () {
    this.init()
  },
  methods: {
    onPaginationData (paginationData) {
      console.log('*****paginationData******')
      console.log(paginationData)
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    deleteRow (rowData) {
      axios.post('http://140.124.181.81:9090/api/deleteAssignment', {
        _id: rowData._id
      })
        .then((response) => {
          this.$refs.vuetable.refresh()
        }).catch((err) => {
          console.log(err)
        })
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    enterAssignment (rowData) {
      rowData.courseid = this.courseid
      this.actionaddAssignment(rowData)
      this.$router.push({
        path: rowData.assignmentname + '/assignmentListForGrading'
      })
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    init () {
      this.initAssignmentUrl()
    },
    viewReport (rowData) {
      this.actionAddAssignmentId(rowData._id)
      this.$router.push({
        path: 'report/' + rowData._id
      })
      // console.log(rowData)
    },
    ...mapActions(['actionaddAssignment', 'initAssignmentUrl', 'actionAddAssignmentId'])
  }
}
</script>
