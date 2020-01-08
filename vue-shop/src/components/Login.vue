<template>
    <div class="class_wrapper">
     <div class="class_box">
         <div class="top_container">
             <img src="../assets/images/kant.png">
         </div>
         <el-form ref="Loginfrom" :model="frommodel" :rules="rules" label-width="0px" class="login_form">
                <el-form-item  prop="username">
                    <el-input v-model='frommodel.username' prefix-icon="el-icon-user-solid"></el-input>
                </el-form-item>
                <el-form-item  prop="password">
                    <el-input v-model='frommodel.password' prefix-icon="el-icon-search"></el-input>
                </el-form-item>
                <el-form-item class="btns">
                    <el-button type="primary" plain @click="login()">登录</el-button>
                    <el-button type="info" plain @click="reset()">重置</el-button>
                </el-form-item>
            </el-form>
     </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
             frommodel: {
             username: 'cheshi',
             password: '123456'
             },
             rules:{
                 username: [{required: true, message: '账号不可为空', trigger: 'blur'
                 },{
                 min: 3, max: 6, message: '账号长度在 3 到 6 个字符', trigger: 'blur' 
                 }],
                password:[{
                required: true, message: '密码不可为空', trigger: 'blur'
                },{
                min: 6, max: 16, message: '密码长度在 6 到 16个字符', trigger: 'blur' 
                }]
             }
        }
    },
     methods: {
    reset() {
      this.$refs.Loginfrom.resetFields()
    },
    login() {
      this.$refs.Loginfrom.validate((valid) => {
        console.log(this.frommodel.password);
         if (!valid) {
         return this.$router.push("/login");}
         if(this.frommodel.username=="cheshi"&&this.frommodel.password=="123456")
         return  this.$message.success('登录成功')
        else
        return  this.$message.error('登录失败')
      })
    }
    // Login(){
    //     this.$refs.Loginfrom.validate(async (valid)=>{
    //        if(!valid)
    //        return this.$router.push('/login');
    //        const {data:res}=await this.$http.post('/login',this.Loginfrom);
    //         console.log(res);
    //     //    if(res.meta.stauts!==200)
    //     //    this.$message.error("登录失败");
    //     //    else
    //     //    this.$message.success("登录成功");

    //     })
    // }
  }
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
