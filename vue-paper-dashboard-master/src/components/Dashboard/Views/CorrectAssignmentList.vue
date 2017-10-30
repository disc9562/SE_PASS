<template>
    <div class="row">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#HW1">HW1</a></li>
        <li><a data-toggle="tab" href="#HW2">HW2</a></li>
      </ul>
    <div class="tab-content">
      <div  id="HW1" class="tab-pane fade in active">
      <div  class="card">
          <paper-table :title="table1.title"  :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
          </paper-table>
      </div>
      </div>
      <div id="HW2" class="tab-pane fade">
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
  const tableColumns = ['學號', '姓名', '上傳情況', '批改後成績', '評語', '檔案下載', '批改']
  const tableData = [{
    學號: '105598054',
    姓名: '阿發',
    上傳情況: '補交',
    批改後成績: '60',
    評語: '在遲交R',
    檔案下載: '',
    批改: ''
  }
  ]

  const tableData1 = [{
    學號: '105598054',
    姓名: '阿發',
    上傳情況: '已交',
    批改後成績: '78',
    評語: '給你這分數因為你這個人',
    檔案下載: '',
    批改: ''
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
          columns: [...tableColumns],
          data: [...tableData1]
        }
      }
    }
  }

</script>
<style>

</style>
