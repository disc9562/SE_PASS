<template>
  <div class="row">
    <ul class="nav nav-tabs">
      <li><a data-toggle="tab" href="#teacher">teacher</a></li>
      <li class="active"><a data-toggle="tab" href="#student">student</a></li>
    </ul>
    <div class="tab-content">
      <div id="teacher" class="tab-pane fade">
        <div class="card">
           <vuetable ref="vuetable" :fields="fields"  pagination-path="" :css="css.table" :per-page="10" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"  api-url="http://140.124.181.149:9000/api/getAccountListByRole?role=admin">
              <template slot="actions" scope="props">
                <div class="table-button-container">
                  <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
                    <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
                  <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                    <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
                </div>
              </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>          
        </div>
      </div>
      <div id="student" class="tab-pane fade in active">
        <div class="card">
         <vuetable ref="vuetable" :fields="fieldsOfStudent" pagination-path="" :css="css.table" :per-page="10" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"  api-url="http://140.124.181.149:9000/api/getAccountListByRole?role=student">
              <template slot="actions" scope="props">
                <div class="table-button-container">
                  <button class="btn btn-warning btn-sm" @click="editRow(props.rowData)">
                    <span class="glyphicon glyphicon-pencil"></span> Edit</button>&nbsp;&nbsp;
                  <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                    <span class="glyphicon glyphicon-trash"></span> Delete</button>&nbsp;&nbsp;
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
        fieldsOfStudent: [
          {
            name: 'id',
            title: '<span class="orange fa fa-address-card"></span> ID'
          },
          {
            name: 'username',
            title: '<span class="orange glyphicon glyphicon-user"></span> User Name'
          },
          {
            name: 'email',
            title: '<span class="orange glyphicon glyphicon-envelope"></span> Email'
          },
          {
            name: 'birthdate',
            title: '<span class="orange fa fa-child"></span> TA'
          },
          '__slot:actions'
        ],
  
        fields: [{
          name: 'id',
          title: '<span class="orange fa fa-address-card"></span> ID'
          // sortField: 'id'
        },
        {
          name: 'username',
          title: '<span class="orange glyphicon glyphicon-user"></span> User Name'
          // sortField: 'username'
        },
        {
          name: 'email',
          title: '<span class="orange glyphicon glyphicon-envelope"></span> Email'
          // sortField: 'email'
        },
          '__slot:actions'
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
      editRow (rowData) {
        alert('You clicked edit on' + JSON.stringify(rowData))
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
