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
  const tableColumns = ['課程名稱', '助教', '上課時間', '人數', '編輯']
  const tableData = [{
    課程名稱: 'SE',
    助教: 'Hank',
    上課時間: '週二 14:00~15:00; 週三 16:00~18:00',
    人數: '78',
    編輯: 'Edit'
  },
  {
    課程名稱: '軟體測試與驗證',
    助教: 'Andy',
    上課時間: '週三 14:00~15:00; 週四 16:00~18:00',
    人數: '87',
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
