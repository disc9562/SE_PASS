 <template>
 <div class="card">
          <vuetable ref="vuetable" pagination-path="" :fields="fields" :sort-order="sortOrder" :css="css.table" :per-page="5" @vuetable:pagination-data="onPaginationData" @vuetable:loading="onLoading" @vuetable:loaded="onLoaded" :api-url="apiUrl">
            <template slot="actions" scope="props">
                      <div class="table-button-container">

                        <button class="btn btn-success btn-sm" @click="direct(props.rowData)">
                          <span class="glyphicon glyphicon-log-in"></span> 進入課程</button>&nbsp;&nbsp;
                      </div>
             </template>
          </vuetable>
          <vuetable-pagination ref="pagination" :css="css.pagination" @vuetable-pagination:change-page="onChangePage"></vuetable-pagination>
        </div>
</template>
<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      url: undefined,
      fields: [
        {
          name: 'coursename',
          title: '<span class="orange glyphicon glyphicon-book"></span> 課程名稱',
          sortField: 'name'
        },
        {
          name: 'courseteacher',
          title: '授課老師',
          sortField: 'email'
        },
        {
          name: 'classtime',
          title: '上課時間',
          sortField: 'email'
        },
        {
          name: 'population',
          title: '人數限制',
          sortField: 'gender'
        },
        {
          name: 'coursedescription',
          title: '課程描述',
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
  mounted () {
    this.init()
  },
  props: ['apiUrl'],
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
    direct (rowData) {
      this.actionEnterCourse(rowData)
      this.$router.push({
        path: '/teacher/Course/assignmentList'
      })
    },
    onLoading () {
      console.log('loading... show your spinner here')
    },
    onLoaded () {
      console.log('loaded! .. hide your spinner here')
    },
    ...mapActions(['actionEnterCourse', 'actionLeaveCourse'])
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
