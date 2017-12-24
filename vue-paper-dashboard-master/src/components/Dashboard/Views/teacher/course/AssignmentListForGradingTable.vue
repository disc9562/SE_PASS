<template> 
<div class="card">
  <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="apiUrl">
    <template slot="actions" scope="props">
      <div class="table-button-container">
        <button class="btn btn-primary btn-sm" @click="downLoadAssignment(props.rowData)">
          <span class="glyphicon glyphicon-pencil"></span> 下載作業</button>&nbsp;&nbsp;           
        <button class="btn btn-success btn-sm" @click="correctAssignment(props.rowData)">
          <span class="glyphicon glyphicon-pencil"></span> 作業批改</button>&nbsp;&nbsp;
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
      fields: [{
        name: 'id',
        title: '<span class="orange fa fa-address-card"></span> ID'
      },
      {
        name: 'username',
        title: '<span class="orange glyphicon glyphicon-user"></span> User Name'
      },
      {
        name: 'submitAssignment',
        title: '<span class="orange fa fa-history"></span> 繳交情況'
      },
      {
        name: 'assignmentScore',
        title: '<span class="orange fa fa-history"></span> 成績'
      },
      {
        name: 'assignmentDiscript',
        title: '<span class="orange fa fa-commenting"></span> 評語'
      },
        '__slot:actions'
      ],
      sortOrder: [{
        field: 'name',
        direction: 'asc'
      }],
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
  props: ['apiUrl'],
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    correctAssignment (rowData) {
      this.$router.push({
        path: 'gradingAssignment'
      })
    },
    downLoadAssignment (rowData) {
      axios.get('http://localhost:9090/download', {
        params: {
          courseName: rowData
          // assignmentName:
        }
      })
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    ...mapActions(['actionaddAssignment'])
  }
}
</script>
