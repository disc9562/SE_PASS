<template>
    <div class="row">
      <ul class="nav nav-tabs">
        <li class="active"><a data-toggle="tab" href="#home">Home</a></li>
        <li><a data-toggle="tab" href="#menu1">Menu 1</a></li>
      </ul>
    <div class="tab-content">
      <div  id="home" class="tab-pane fade in active">
      <div  class="card">
          <paper-table :title="table1.title"  :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">
          </paper-table>
      </div>
      </div>
    <div id="menu1" class="tab-pane fade">
          <div class="card">
          <paper-table :title="table2.title"    :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns">
          </paper-table>
          </div>
     </div>
    </div>
      <div class="col-md-12">
        <div class="card">
  
      
  
          <!-- </a> -->
        </div>
      </div>

       <div class="col-md-12">
        <div class="card card-plain">
          
        </div>
      </div> 

    </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['作業名稱', '繳交期限', '繳交人數', '報表', '編輯']
  const tableData = [{
    作業名稱: 'HW1',
    繳交期限: '週二 14:00~15:00; 週三 16:00~18:00',
    繳交人數: '12 / 78',
    報表: '',
    編輯: 'Edit'
  }
  ]
  const tableData1 = [{
    作業名稱: 'HW2',
    繳交期限: '週三 14:00~15:00; 週四 16:00~18:00',
    繳交人數: '77 / 78',
    報表: '',
    編輯: 'Edit'
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

        // },
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
