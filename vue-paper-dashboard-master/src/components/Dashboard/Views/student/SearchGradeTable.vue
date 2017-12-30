<template>
<div class="card">
       <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="url">
            <template slot="actions" scope="props">
                    <div class="table-button-container">
                        <upload-for-student :assignmentName="props.rowData.assignmentname" :courseName="courseName" :studentId="studentId" :courseId="courseId"></upload-for-student>
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
import uploadForStudent from '../uploadForStudent.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    uploadForStudent
  },
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
          title: '<span class="orange glyphicon glyphicon-time"></span> 繳交期限',
          sortField: 'assignmentdescription'
        },
        {
          name: 'assignmentdescription',
          title: '<span class="orange glyphicon glyphicon-time"></span> 作業描述',
          sortField: 'assignmentdescription'
        },
        {
          name: 'studentdetail.0.submitAssignment',
          title: '<span class="orange glyphicon glyphicon-time"></span> 上傳狀態',
          sortField: 'assignmentdescription'
        },
        {
          name: 'studentdetail.0.assignmentDiscript',
          title: '<span class="orange fa fa-history"></span> 作業評語',
          sortField: 'deadline'
        },
        {
          name: 'studentdetail.0.assignmentScore',
          title: '<span class="orange glyphicon glyphicon-time"></span> 成績',
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
  computed: {
    ...mapGetters({courseName: 'getCourseName', studentId: 'getId', courseId: 'getCourseId'})
  },
  mounted () {
    console.log('apiUrl')
    console.log(this.apiUrl)
    this.url = this.apiUrl + '&id=' + this.studentId
    console.log(this.url)
  },
  props: ['apiUrl', 'studentId', 'url'],
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    deleteRow (rowData) {
      alert('You clicked delete on' + JSON.stringify(rowData))
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    }
  }
}
</script>
