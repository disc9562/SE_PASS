 <template>
<!-- <form> -->
  <!-- <div class="form-group">
		<label for="exampleInputEmail1">課程名稱</label>
    <input class="form-control" id="exampleInputEmail1">
    <div class="form-group"><br>	<label for="exampleInputEmail1">開課教師</label><br>
              <select >
                <option value="Instructor">Instructor</option>
                <option value="Student">Student</option>
                <option value="TA">TA</option>
                <option value="Admin">Admin</option>
              </select>
    </div>
    <label for="exampleInputEmail1">上課時間</label>
    <input type="date" class="form-control" id="exampleInputEmail1">
  </div>
  <div class="form-group">
    <label for="exampleTextarea">課程描述</label>
    <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
  </div>
  <button type="submit" class="btn btn-primary"@click="submit()">儲存</button>
  <button type="submit" class="btn btn-primary"@click="cancel()">取消</button>
</form>   -->
<div class= "row">
  <div class= "row">
    <div class="col-sm-6">
       <h5>Step1: 選擇課程</h5>
        <div class="well" style="overflow-y: scroll;max-height: 40vh;">
          <div class="btn-group-vertical" style="width: 100%">
            <button type="button" class="btn btn-default">
            </button>
          </div>
        </div>
    </div>
    <div class="col-sm-6">
         <h5>Step2: 選擇學生(可多選)</h5>
        <div class="well" style="overflow-y: scroll;max-height: 40vh;">
          <div class="btn-group-vertical" style="width: 100%">
            <input type="checkbox" class="btn btn-default">
            </input>
          </div>
        </div>
    </div>
  </div>
  <div class="row">
     <div class="col-sm-12">
       <button type="button" class="btn btn-default" style="float:right">送出表單
      </button>
    </div>
  </div>
</div>
</template>
<script>
  export default {
    methods: {
      cancel () {
        this.$router.push({
          path: '/account/allCourseList'
        })
      },
      submit () {     // todo
        this.$router.push({
          path: '/account/allCourseList'
        })
      }
    }
  
  }
</script>
