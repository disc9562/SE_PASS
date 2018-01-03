<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" api-url="http://140.124.181.81:9090/api/getAllCourse">
            <template slot="actions" scope="props">
                      <div class="table-button-container">
                        <button class="btn btn-success btn-sm" @click="courseInfo(props.rowData)">
                          <span class="glyphicon glyphicon-trash"></span> 詳細資料</button>&nbsp;&nbsp;
                        <button class="btn btn-danger btn-sm" @click="deleteCourse(props.rowData)">
                          <span class="glyphicon glyphicon-trash"></span> 刪除課程</button>&nbsp;&nbsp;
                      </div>
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
const axios = require('axios')
export default {
  data () {
    return {
      fields: [
        {
          name: 'coursename',
          title: '<span class="orange glyphicon glyphicon-book"></span> 課程名稱'
        },
        {
          name: 'courseteacher',
          title: '老師'
        },
        {
          name: 'classtime',
          title: '課程時間'
        },
        {
          name: 'population',
          title: '人數'
        },
        {
          name: 'coursedescription',
          title: '課程描述'
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
  mounted () {
    console.log('this.init')
    this.init()
  },
  computed: {
  /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  },
  methods: {
    init () {
      this.actionLeaveCourse()
    },
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    courseInfo (rowData) {
      console.log(rowData)
      this.actionEnterCourse(rowData)
      this.$router.push({
        path: '/account/courseInfo'
      })
    },
    deleteCourse (rowData) {
      axios.post('http://140.124.181.81:9090/api/deleteCourse', {
        coursename: rowData.coursename,
        _id: rowData._id
      })
        .then((response) => {
          location.reload()
        }).catch((err) => {
          console.log(err)
        })
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    ...mapActions(['actionEnterCourse', 'actionLeaveCourse'])
  }
}
</script>
