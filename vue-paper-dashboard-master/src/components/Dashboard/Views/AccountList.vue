<template>
    <div class="row">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#teacher">teacher</a></li>
        <li><a data-toggle="tab" href="#student">student</a></li>
      </ul>
    <div class="tab-content">
      <div  id="teacher" class="tab-pane fade in active">
      <div  class="card">
          <paper-table :title="table1.title"  :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
          </paper-table>
      </div>
      </div>
      <div id="student" class="tab-pane fade">
          <div class="card">
          <paper-table :title="table2.title"    :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns">
          </paper-table>
          </div>
      </div>
    </div>
    </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['姓名', '信箱', '帳號', '刪除']
  const tableColumns1 = ['姓名', '信箱', '帳號', '助教', '刪除']

  const tableData = [{
    姓名: 'Andy',
    信箱: 'AndyDog@gmail.com',
    帳號: 'T105598054',
    刪除: '刪除'
  }
  ]

  const tableData1 = [{
    姓名: 'Hank',
    信箱: 'Hank@gmail.com',
    帳號: '105598054',
    助教: 'Y',
    刪除: '刪除'
  }
  ]

  export default {
    components: {
      PaperTable
    },
  
    data () {
      return {
        table1: {
          title: 'Stripped Table',
          subTitle: 'Here is a subtitle for this table',
          columns: [...tableColumns],
          data: [...tableData]
        },
        table2: {
          title: 'Table on Plain Background',
          subTitle: 'Here is a subtitle for this table',
          columns: [...tableColumns1],
          data: [...tableData1]
        }
      }
    }
  }

</script>
<style>

</style>
