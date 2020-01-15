<template>
  <el-container class="home-container">
     <el-header>
       <div>
         <img src="../assets/images/kant.png" height="50"/>
         <span>电商后台管理系统</span>
       </div>
        <el-button type="info" plain @click="close()">退出系统</el-button>
     </el-header>
     <el-container>
        <el-aside :width="isfoding?'64px':'200px'">
          <div class="toggleCollapse" @click="Foldingswitch" v-if="isfoding">《</div>
           <div class="toggleCollapse" @click="Foldingswitch" v-else>》</div>
       <el-menu
      background-color="#333744"
      text-color="#fff"
      active-text-color="#409EFF"
      unique-opened
      :collapse='isfoding'
       :collapse-transition='false'
       :default-active="isIndex"
      router >
      <el-submenu :index="item.id +''" :key='item.id' v-for='item in meunlist'>
        <template slot="title">
          <i :class="isconobj[item.id]"></i>
          <span>{{item.authName}}</span>
        </template>
          <el-menu-item :index="'/'+finditem.path" :key='finditem.id' v-for="finditem in item.children" @click="getReal('/'+finditem.path)">
             <template slot="title">
          <i class="el-icon-menu"></i>
          <span>{{finditem.authName}}</span>
        </template>
            </el-menu-item>
      </el-submenu>
    </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
     </el-container>
  </el-container>
</template>
<script>
export default {
  // 组件渲染完成时触发
  created () {
    this.getMenulist()
    this.isIndex = window.sessionStorage.getItem('getIndex')
  },
  data () {
    return {
      meunlist: [],
      isconobj: {
        '125': 'iconfont icon-user',
        '101': 'iconfont icon-shangpin',
        '102': 'iconfont icon-danju',
        '145': 'iconfont icon-baobiao',
        '103': 'iconfont icon-tijikongjian'
      },
      isfoding: false,
      isIndex: ''
    }
  },
  methods: {
    close () {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    async  getMenulist () {
      let { data: res } = await this.$http.get('menus')
      this.meunlist = res.data
    },
    // 控制菜单或展开
    Foldingswitch  () {
      this.isfoding = !this.isfoding
    },
    // 高亮显示
    getReal (obj) {
      window.sessionStorage.setItem('getIndex', obj)
      this.isIndex = obj
    }

  }
}
</script>
<style lang="less" scoped>
  .home-container{
    height: 100%
  }
  .el-header{
    background-color:#333744;
    display: flex;
    justify-content: space-between;
    padding-left: 0;
    color: #fff;
    font-size: 22px;
    align-items: center;
    >div{
      display:flex;
      align-items: center;
      span{
        margin-left: 20px;
      }
      img{
         margin-left: 5px;
      }
    }

  }
  .el-aside{
    background-color:#333744;
    >.el-menu {
      border-right: 0
    }
  }
  .el-main{
    background-color:white
  }
  .iconfont{
    margin-right:10px
  }
  .toggleCollapse{
    background-color: #4a5064;
    font-size: 10 px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    letter-spacing: 0.3em
  }
</style>
