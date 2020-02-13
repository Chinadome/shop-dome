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
            <el-col :span="6"><el-button type="primary" @click="addUserdialog=true" plain>添加用户</el-button></el-col>
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
              <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeUserById(scope.row.id)"></el-button>
              <el-tooltip class="item" :enterable="false" effect="dark" content="分配角色" placement="top">
              <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
              </el-tooltip>
              </template>
           </el-table-column>
         </el-table>
         <!--分页-->
         <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="queryInfo.pagenum"
          :page-sizes="[1, 2, 4, 10]"
          :page-size="queryInfo.pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total='total'>
       </el-pagination>
       <!--添加用户对话框-->
         <el-dialog
         title="添加用户"
        :visible.sync="addUserdialog"
        width="50%" @close="addDialogClosed">
        <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
           <el-input v-model="addForm.email"></el-input>
         </el-form-item>
        <el-form-item label="手机" prop="mobile">
           <el-input v-model="addForm.mobile"></el-input>
        </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
         <el-button @click="addUserdialog = false">取 消</el-button>
         <el-button type="primary" @click="addUser">确 定</el-button>
          </span>
          </el-dialog>
           <!--修改用户对话框-->
         <el-dialog
         title="修改用户"
        :visible.sync="editUserdialog"
        width="50%" @close="editDialogClosed">
        <el-form :model="editForm" :rules="edittFormRules" ref="editFormRef" label-width="70px">
        <el-form-item label="用户名" prop="username">
            <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
           <el-input v-model="editForm.email"></el-input>
         </el-form-item>
        <el-form-item label="手机" prop="mobile">
           <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
         <el-button @click="editUserdialog = false">取 消</el-button>
         <el-button type="primary" @click="editUser">确 定</el-button>
          </span>
          </el-dialog>
        </el-card>
    </div>
</template>
<script>
export default {
  data () {
    // 验证邮箱规则
    var checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱！'))
    }
    // 验证手机号规则
    var checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0-9]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入正确的手机号！ '))
    }
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 2
      },
      userList: [],
      total: 0,
      addUserdialog: false,
      // 用户表单数据对象
      addForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单校验规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkMobile }
        ]
      },
      editUserdialog: false,
      editForm: {},
      // 修改用户验证规则
      edittFormRules: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail }
        ],
        mobile: [
          { required: true, message: '请输入电话', trigger: 'blur' },
          { validator: checkMobile }
        ]
      }
    }
  },
  // 页面初加载
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
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    // 增加用户
    addUser () {
      this.$refs.addFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/users', this.addForm)
        if (res.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加成功')
        this.addUserdialog = false
        this.getUserList()
      })
    },
    // 监听修改用户对话框的关闭事件
    editDialogClosed () {
      this.$refs.editFormRef.resetFields()
    },
    // 编辑用户
    async   showEditDialog (id) {
      // eslint-disable-next-line no-unused-vars
      const { data: res } = await this.$http.get('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('用户查询信息失败！')
      }
      this.editUserdialog = true
      this.editForm = res.data
    },
    // 提交编辑
    editUser () {
      this.$refs.editFormRef.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put('users/' + this.editForm.id, {
          email: this.editForm.email,
          mobile: this.editForm.mobile
        })
        if (res.meta.status !== 200) {
          return this.$message.error('用户跟新列表失败！')
        }
        this.editUserdialog = false
        this.getUserList()
        this.$message.success('更新列表成功！')
      })
    },
    // 根据id删除用户
    async  removeUserById (id) {
      const confirm = await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirm !== 'confirm') {
        return this.$message.info('删除已取消')
      }
      const { data: res } = await this.$http.delete('users/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功')
      this.getUserList()
    }
  }
}
</script>
