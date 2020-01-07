<template>
    <div class="class_wrapper">
     <div class="class_box">
         <div class="top_container">
             <img src="../assets/images/kant.png">
         </div>
         <el-form label-width="0px" class="login_form">
                <el-form-item>
                    <el-input prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" plain>登录</el-button>
                    <el-button type="info" plain>重置</el-button>
                </el-form-item>
            </el-form>
     </div>
    </div>
</template>
<script>
export default {
}
</script>
<style lang="less" scoped>
.class_wrapper{
  background-color:lightgreen;
  height: 100%;
  .class_box{
      width: 450px;
      height:300px;
      background-color: #ffffff;
      border-radius:3px;
      position: absolute;
      left:34% ;
      top:34%;
      transform: translate(-50,-50%);
      .top_container{
         width: 120px;
         height: 130px;
         border: 1px solid #eee;
         border-radius: 50%;
         padding: 8px;
         background-color: #fff;
         position: absolute;
         left: 50%;
         transform: translate(-50%,-50%);
         box-shadow: 0 0 10px #ddd;
         img{
             width: 100%;
             height:100%;
             border-radius: 50%;
              background-color: #ddd;
         }
      }
  }
}
.login_form {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;
}

.btns {
    display: flex;
    justify-content: flex-end;
}
</style>
