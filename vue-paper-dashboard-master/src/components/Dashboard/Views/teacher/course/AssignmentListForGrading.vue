<template>
  <div class="row">
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#HW1">HW1</a></li>
      <li><a data-toggle="tab" href="#HW2">HW2</a></li>
    </ul>
    <div class="tab-content">
      <div id="HW1" class="tab-pane fade in active">
        <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" api-url="https://vuetable.ratiw.net/api/users">
            <template slot="actions" scope="props">
                      <div class="table-button-container">
                        <button class="btn btn-primary btn-sm" @click="correctAssignment(props.rowData)">
                          <span class="glyphicon glyphicon-pencil"></span> 作業批改</button>&nbsp;&nbsp;
                      </div>
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
      </div>
      <div id="HW2" class="tab-pane fade">
        <div class="card">
          <vuetable ref="vuetable" :fields="fields" :sort-order="sortOrder" pagination-path="" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"  api-url="https://vuetable.ratiw.net/api/users">
            <template slot="actions" scope="props">
              <div class="table-button-container">
                <button class="btn btn-primary btn-sm" @click="correctAssignment(props.rowData)">
                <span class="glyphicon glyphicon-pencil"></span> 作業批改</button>&nbsp;&nbsp;
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
          title: '<span class="orange fa fa-address-card"></span> ID',
          sortField: 'name'
        },
        {
          name: 'email',
          title: '<span class="orange glyphicon glyphicon-user"></span> User Name',
          sortField: 'email'
        },
        {
          name: 'gender',
          title: '<span class="orange fa fa-history"></span> 繳交情況',
          sortField: 'gender'
        },
          '批改後成績',
        {
          name: 'gender',
          title: '<span class="orange fa fa-commenting"></span> 評語',
          sortField: 'gender'
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
          path: '/teacher/Course/gradingAssignment'
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
