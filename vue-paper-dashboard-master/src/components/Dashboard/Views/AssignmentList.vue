<template>
    <div class="row">
      <div class="col-md-12">
        <div class="card">
          <paper-table :title="table1.title" :sub-title="table1.subTitle" :data="table1.data" :columns="table1.columns">

          </paper-table>
        </div>
      </div>

      <!-- <div class="col-md-12">
        <div class="card card-plain">
          <paper-table type="hover" :title="table2.title" :sub-title="table2.subTitle" :data="table2.data" :columns="table2.columns">

          </paper-table>
        </div>
      </div> -->

    </div>
</template>
<script>
  import PaperTable from 'components/UIComponents/PaperTable.vue'
  const tableColumns = ['作業名稱', '繳交期限', '繳交人數', '報表', '編輯']
  const tableData = [{
    作業名稱: 'HW1',
    繳交期限: '11/08 23:59:59',
    繳交人數: '14 / 78',
    報表: '',
    編輯: 'edit'
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
        }
        // },
        // table2: {
        //   title: 'Table on Plain Background',
        //   subTitle: 'Here is a subtitle for this table',
        //   columns: [...tableColumns],
        //   data: [...tableData]
        // }
      }
    }
  }

</script>
<style>

</style>
