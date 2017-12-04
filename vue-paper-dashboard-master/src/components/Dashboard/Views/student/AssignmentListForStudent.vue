<template>
    <div class="row">
      <div class="col-md-12">
         <div class="card">
          <vuetable ref="vuetable" 
                    pagination-path="" 
                    :fields="fields" 
                    :sort-order="sortOrder" 
                    :css="css.table" 
                    :per-page="5" 
                    @vuetable:pagination-data="onPaginationData" 
                    @vuetable:loading="onLoading" 
                    @vuetable:loaded="onLoaded" 
                    api-url="https://vuetable.ratiw.net/api/users">
            <template slot="actions" scope="props">
                <div class="table-button-container">
                  <uploadFile></uploadFile>
                </div> 
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" 
                               :css="css.pagination" 
                               @vuetable-pagination:change-page="onChangePage">
          </vuetable-pagination>
        </div>
      </div>
    </div>
</template>

<script>
import uploadFile from '../uploadFile.vue'
export default {
  components: {
    uploadFile
  },
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
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    }
  }
}
</script>
