<template>
<form>
  <div class="form-group">
		<label for="exampleInputEmail1">作業名稱</label>
    <input class="form-control" id="exampleInputEmail1">
    <label for="exampleInputEmail1">繳交期限</label>
    <input type="date" class="form-control" id="exampleInputEmail1">
  </div>
  <div class="form-group">
    <label for="exampleTextarea">作業描述</label>
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
          path: '/Course/assignmentList'
        })
      },
      submit () {     // todo
        this.$router.push({
          path: '/Course/assignmentList'
        })
      }
    }
  
  }
</script>
