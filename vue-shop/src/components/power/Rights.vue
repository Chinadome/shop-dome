<template>
     <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>权限管理</el-breadcrumb-item>
           <el-breadcrumb-item>权限列表</el-breadcrumb-item>
       </el-breadcrumb>
        <el-card class="box-card">
           <el-table :data='rightList' style="width: 100%" border stripe>
            <el-table-column  align="center" type="index" label="序号" width="60px">
           </el-table-column>
           <el-table-column prop="authName" align="center" label="权限名称">
           </el-table-column>
           <el-table-column  prop="path" align="center" label="路径">
           </el-table-column>
           <el-table-column align="center" label="权限等级">
               <template slot-scope="scope">
                  <el-tag v-if="scope.row.level==='0'">一级</el-tag>
                  <el-tag v-else-if="scope.row.level==='1'" type="success">二级</el-tag>
                  <el-tag v-else type="warning">三级</el-tag>
               </template>
           </el-table-column>
         </el-table>
        </el-card>
     </div>
</template>
<script>
export default {
  data () {
    return {
      rightList: []
    }
  },
  created () {
    this.getRightList()
  },
  methods: {
    async getRightList () {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      }
      this.rightList = res.data
    }
  }
}
</script>
<style lang="less">

</style>
