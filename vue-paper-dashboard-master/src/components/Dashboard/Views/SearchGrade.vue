<template>
  <div class="row">
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#HW1">查看作業成績</a></li>
    </ul>
    <div class="tab-content">
      <div id="HW1" class="tab-pane fade in active">
        <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" api-url="https://vuetable.ratiw.net/api/users">
            <template slot="actions" scope="props">
                      <div class="table-button-container">
                        <button class="btn btn-primary btn-sm" @click="correctAssignment(props.rowData)">
                          <span class="glyphicon glyphicon-pencil"></span> 查看報表</button>&nbsp;&nbsp;
                      </div>
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        fields: [{
          name: 'name',
          title: '<span class="orange fa fa-address-card"></span>作業',
          sortField: 'name'
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
      correctAssignment (rowData) {
        this.$router.push({
          path: '/Course/gradingAssignment'
        })
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
