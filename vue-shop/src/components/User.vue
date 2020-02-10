<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>用户管理</el-breadcrumb-item>
           <el-breadcrumb-item>用户列表</el-breadcrumb-item>
       </el-breadcrumb>
       <el-card class="box-card">
         <el-row :gutter="20">
            <el-col :span="8">
              <el-input placeholder="请输入内容" v-model="queryInfo.query" class="input-with-select" clearable @clear="getUserList()">
                <el-button slot="append" icon="el-icon-search" @click="getUserList()"></el-button>
              </el-input>
            </el-col>
            <el-col :span="6"><el-button type="primary" plain>新增</el-button></el-col>
            <el-col :span="6"></el-col>
            <el-col :span="6"></el-col>
         </el-row>
         <el-table :data='userList' style="width: 100%" border stripe>
            <el-table-column  align="center" type="index" label="序号" width="60px">
           </el-table-column>
           <el-table-column prop="username" align="center" label="姓名">
           </el-table-column>
           <el-table-column  prop="email" align="center" label="邮箱">
           </el-table-column>
           <el-table-column prop="mobile" align="center" label="电话">
           </el-table-column>
           <el-table-column prop="role_name" align="center" label="角色">
           </el-table-column>
            <el-table-column   align="center" label="状态">
              <template slot-scope="scope">
              <el-switch v-model="scope.row.mg_state" @change="userState(scope.row)">
              </el-switch>
              </template>
           </el-table-column>
           <el-table-column align="center" label="操作">
              <template >
              <el-button type="primary" icon="el-icon-edit" size="mini">
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
              <el-tooltip class="item" :enterable="false" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
              </template>
           </el-table-column>
         </el-table>
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 4, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total='total'>
       </el-pagination>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0
    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    async getUserList () {
      const { data: res } = await this.$http.get('/users', { params: this.queryInfo })
      if (res.meta.status !== 200) {
        return this.$message.error('获取用户列表失败')
      } else {
        this.userList = res.data.users
        this.total = res.data.total
      }
    },
    // 监听switch开关
    async userState (userinfo) {
      const { data: res } = await this.$http.put(`users/${userinfo.id}/state/${userinfo.mg_state}`)
      if (res.meta.status !== 200) {
        userinfo.mg_state = !userinfo.mg_state
        return this.$message.error('跟新列表失败！')
      }
      this.$message.success('跟新成功！')
    },
    // 监听pagesize改变
    handleSizeChange (Size) {
      this.queryInfo.pagesize = Size
      this.getUserList()
    },
    // 监听页码值改变
    handleCurrentChange (Page) {
      this.queryInfo.pagenum = Page
      this.getUserList()
    }
  }
}
</script>
