 <template>
 <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="getStudentUrl">
            <template slot="actions" scope="props">
                      <div class="table-button-container">

                        <button class="btn btn-success btn-sm" @click="deleteStudent(props.rowData)">
                          <span class="glyphicon glyphicon-log-in"></span>刪除學生</button>&nbsp;&nbsp;
                      </div>
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
</template>
<script>
import axios from 'axios'
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      url: undefined,
      fields: [
        {
          name: 'username',
          title: '<span class="orange glyphicon glyphicon-book"></span> 學生名稱'
        },
        {
          name: 'id',
          title: '學號'
        },
        {
          name: 'TA',
          title: '助教'
        },
        {
          name: 'email',
          title: '信箱'
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
  props: ['getStudentUrl', 'getCourseId'],
  methods: {
    onPaginationData (paginationData) {
      this.$refs.pagination.setPaginationData(paginationData)
    },
    onChangePage (page) {
      this.$refs.vuetable.changePage(page)
    },
    deleteStudent (rowData) {
      axios.post('http://localhost:9090/api/deleteCourseStudent', {
        courseid: this.getCourseId,
        studentid: rowData.id
      })
        .then((response) => {
          this.$refs.vuetable.refresh()
          // this.$router.push({
          //   path: '/account/courseInfo'
          // })
          // console.log('response')
          // console.log(response)
          // location.reload()
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
    ...mapActions(['actionEnterCourse'])
  },
  computed: {
    // ...mapGetters(['getUser'])
  /* httpOptions(){
    return {headers: {'Authorization': "my-token"}} //table props -> :http-options="httpOptions"
  }, */
  // },
  // watch: {
  //   apiUrl: function (oldval, val) {
  //     this.url = val
  //     console.log(this.url)
  //   }

  }
}
</script>
