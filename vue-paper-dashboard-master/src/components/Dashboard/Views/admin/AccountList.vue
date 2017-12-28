<template>
  <div class="row">
    <ul class="nav nav-tabs">
      <li class="active"><a data-toggle="tab" href="#teacher">teacher</a></li>
      <li><a data-toggle="tab" href="#student">student</a></li>
    </ul>
    <div class="tab-content">
      <div id="teacher" class="tab-pane fade in active">
        <div class="card">
           <vuetable ref="vuetableForTeacher" :fields="fields"  pagination-path="" :css="css.table" :per-page="10" @vuetable:pagination-data="onPaginationDataForTeacher" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"  api-url="http://localhost:9090/api/getAccountListByRole?role=teacher">
              <template slot="actions" scope="props">
                <div class="table-button-container">
                  <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                    <span class="glyphicon glyphicon-trash"></span> 刪除</button>&nbsp;&nbsp;
                </div>
              </template>
          </vuetable>
          <vuetable-pagination ref="paginationForTeacher" :css="css.pagination" @vuetable-pagination:change-page="onChangePageForTeacher"></vuetable-pagination>          
        </div>
      </div>
      <div id="student" class="tab-pane fade ">
        <div class="card">
         <vuetable ref="vuetableForStudent" :fields="fieldsOfStudent" pagination-path="" :css="css.table" :per-page="10" @vuetable:pagination-data="onPaginationDataForStudent" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded"  api-url="http://localhost:9090/api/getAccountListByRole?role=student">
              <template slot="actions" scope="props">
                <div class="table-button-container">
                  <button class="btn btn-danger btn-sm" @click="deleteRow(props.rowData)">
                    <span class="glyphicon glyphicon-trash"></span> 刪除</button>&nbsp;&nbsp;
                </div>
              </template>
          </vuetable>
          <vuetable-pagination ref="paginationForStudent" :css="css.pagination" @vuetable-pagination:change-page="onChangePageForStudent"></vuetable-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  let axios = require('axios')
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
            name: 'TA',
            title: '<span class="orange fa fa-child"></span> TA'
          },
          '__slot:actions'
        ],
  
        fields: [{
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
    methods: {
      onPaginationDataForTeacher (paginationData) {
        this.$refs.paginationForTeacher.setPaginationData(paginationData)
      },
      onChangePageForTeacher (page) {
        this.$refs.vuetableForTeacher.changePage(page)
      },
      onPaginationDataForStudent (paginationData) {
        this.$refs.paginationForStudent.setPaginationData(paginationData)
      },
      onChangePageForStudent (page) {
        this.$refs.vuetableForStudent.changePage(page)
      },
      deleteRow (rowData) {
        axios.post('http://localhost:9090/api/deleteAccount', {
          id: rowData.id
        })
        .then((response) => {
          location.reload()
        }).catch((err) => {
          console.log(err)
        })
        // axios.delete('http://localhost:9090/api/deleteAccount/' + rowData.id)
        // .then(function (response) {
        //   console.log(response)
        // }).catch((err) => {
        //   console.log(err)
        // })
        // alert('You clicked delete on' + JSON.stringify(rowData))
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
