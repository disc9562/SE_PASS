<template>
<form>
  <div class="form-group">
    <label for="exampleInputEmail1">分數</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
  </div>
  <div class="form-group">
    <label for="exampleTextarea">評語</label>
    <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-primary"@click="submit()">儲存</button>
  <button type="submit" class="btn btn-primary"@click="cancel()">取消</button>
</form>  
</template>
<script>
  export default {
    methods: {
      cancel () {
        this.$router.push({
          path: '/teacher/Course/assignmentListForGrading'
        })
      },
      submit () {     // todo
        this.$router.push({
          path: '/teacher/Course/assignmentListForGrading'
        })
      }
    }
  
  }
</script>
