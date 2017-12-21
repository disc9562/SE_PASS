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
// import uploadFile from '../../uploadFile.vue'
import {mapGetters} from 'vuex'
export default {
  components: {
    // uploadFile
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
