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
  const tableColumns = ['作業名稱', '滿分', '分數', '評語', '報表']
  const tableData = [{
    作業名稱: 'hw1',
    滿分: '100',
    分數: '60',
    評語: '讓你畢業',
    報表: ''
  }
  ]

  const tableData1 = [{
    作業名稱: 'hw2',
    滿分: '100',
    分數: '78',
    評語: '不錯有進步哦',
    報表: ''
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
