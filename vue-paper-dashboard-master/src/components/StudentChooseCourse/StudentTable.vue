<template>
<div class="card">
       <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="apiUrl">
            <template slot="actions" scope="props">
                    <div class="table-button-container">
                         <button class="btn btn-success btn-sm" @click="enterCourse(props.rowData)">
                         <span class="glyphicon glyphicon-stats"></span> 進入課程</button>
                    </div>
            </template>
          </vuetable>
         <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
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
          title: '授課導師'
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
  computed: {
    ...mapGetters({courseName: 'getCourseName'})
  },
  props: ['apiUrl', 'id'],
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    enterCourse (rowData) {
      console.log(rowData._id)
      this.actionEnterCourse(rowData)
      this.$router.push({
        path: '/student/' + rowData._id + '/assignmentListForStudent'
      })
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    ...mapActions(['actionEnterCourse'])
  }
}
</script>
