<template>
    <div>
         <el-breadcrumb separator-class="el-icon-arrow-right">
           <el-breadcrumb-item :to="{path: '/' }">首页</el-breadcrumb-item>
           <el-breadcrumb-item>权限管理</el-breadcrumb-item>
           <el-breadcrumb-item>角色列表</el-breadcrumb-item>
          </el-breadcrumb>
          <el-card class="box-card">
            <el-row>
            <el-col><el-button type="primary" @click="addRolesdialog=true" plain>添加角色</el-button>
            </el-col>
            </el-row>
             <el-table :data='rolesList' style="width: 100%" border stripe>
              <el-table-column type="expand">
      <template slot-scope="scope">
         <el-row v-for="(item1,index1) in scope.row.children" :key="item1.id" :class="['v-tag-center','bottom',index1===0 ? 'btop':''] ">
              <el-col :span="5" >
                <el-tag closable @close="removeById(scope.row,item1.id)">{{item1.authName}}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <el-col :span="19">
                <!--第二层-->
                <el-row v-for="(item2,index2) in item1.children" :key="item2.id" :class="['v-tag-center','bottom',index2===0 ? 'btop':''] ">
                    <el-col :spam="6">
                      <el-tag closable type="success" @close="removeById(scope.row,item2.id)">
                        {{item2.authName}}
                        <i class="el-icon-caret-right"></i>
                      </el-tag>
                    </el-col>
                    <el-col :spam="18">
                      <el-tag v-for="(item3) in item2.children" :key="item3.id" closable type="warning" @close="removeById(scope.row,item3.id)">
                        {{item3.authName}}
                      </el-tag>
                    </el-col>
                </el-row>
              </el-col>
          </el-row>
      </template>
    </el-table-column>
            <el-table-column  align="center" type="index" label="序号" width="60px">
           </el-table-column>
           <el-table-column prop="roleName" align="center" label="角色名称">
           </el-table-column>
           <el-table-column  prop="roleDesc" align="center" label="角色描述">
           </el-table-column>
           <el-table-column align="center" label="操作">
              <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="showEditDialog(scope.row.id)">编辑
              </el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="removeRolesById(scope.row.id)">删除</el-button>
              <el-button type="warning" icon="el-icon-setting" size="mini" @click="rolesTreeDialog(scope.row)">分配权限</el-button>
              </template>
           </el-table-column>
         </el-table>
          <!--添加用户对话框-->
         <el-dialog
         title="添加角色"
        :visible.sync="addRolesdialog"
        width="50%" @close="addDialogRoles">
        <el-form :model="addRoles" :rules="addFromRoles" ref="addRolesRefs" label-width="100px">
        <el-form-item label="角色名称" prop="username">
            <el-input v-model="addRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="password">
            <el-input v-model="addRoles.roleDesc"></el-input>
        </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
         <el-button @click="addRolesdialog = false">取 消</el-button>
         <el-button type="primary" @click="addRolesList">确 定</el-button>
          </span>
          </el-dialog>
            <!--修改角色对话框-->
          <el-dialog
         title="修改角色"
        :visible.sync="editRolesdialog"
        width="50%">
        <el-form :model="editRoles" :rules="editFromRoles" ref="editRolesRefs" label-width="100px">
        <el-form-item label="角色名称" prop="username">
            <el-input v-model="editRoles.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="password">
            <el-input v-model="editRoles.roleDesc"></el-input>
        </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
         <el-button @click="editRolesdialog = false">取 消</el-button>
         <el-button type="primary" @click="editRolesList">确 定</el-button>
          </span>
          </el-dialog>
             <!--分配角色-->
          <el-dialog
         title="权限分配"
        :visible.sync="treedialog"
        width="70%">
        <el-tree
      ref="tree"
      :data="treeList"
      show-checkbox
       node-key="id"
     :default-expanded-keys="dialogRolesKyes"
     :default-checked-keys="dialogKeys"
      :props="defaultProps">
   </el-tree>
        <span slot="footer" class="dialog-footer">
         <el-button @click="treedialog = false;roleId = ''">取 消</el-button>
         <el-button type="primary" @click="addTree">确 定</el-button>
          </span>
          </el-dialog>
          </el-card>
    </div>
</template>
<script>
export default {
  data () {
    return {
      rolesList: [],
      // 角色表单数据对象
      addRoles: {
        roleName: '',
        roleDesc: ''
      },
      // 添加用户验证规则
      addRolesdialog: false,
      // 添加角色表单校验规则对象
      addFromRoles: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: false, message: '请输入角色描述', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      },
      editRoles: [],
      // 修改用户验证规则
      editRolesdialog: false,
      // 添加角色表单校验规则对象
      editFromRoles: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        roleDesc: [
          { required: false, message: '请输入角色描述', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      },
      treedialog: false,
      treeList: [],
      dialogKeys: [],
      dialogRolesKyes: [],
      defaultProps: {
        children: 'children',
        label: 'authName',
        disabled: false,
        isLeaf: true
      },
      roleId: ''
    }
  },
  created () {
    this.getRolesList()
  },
  methods: {
    async getRolesList () {
      const { data: res } = await this.$http.get('roles')
      if (res.meta.status !== 200) {
        return this.$message.error('获取角色列表失败')
      } else {
        this.rolesList = res.data
        this.total = res.data.length
      }
    },
    // 监听添加角色对话框的关闭事件
    addDialogRoles () {
      this.$refs.addRolesRefs.resetFields()
      // 为了防止resetFields() 失效
      this.addRoles = {}
    },
    // 增加角色
    addRolesList () {
      this.$refs.addRolesRefs.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.post('/roles', this.addRoles)
        if (res.meta.status !== 201) return this.$message.error('添加失败')
        this.$message.success('添加成功')
        this.addRolesdialog = false
        this.getRolesList()
      })
    },
    // 删除角色
    async  removeRolesById (id) {
      const confirm = await this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirm !== 'confirm') {
        return this.$message.info('删除已取消')
      }
      const { data: res } = await this.$http.delete('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功')
      this.getRolesList()
    },
    // 编辑角色
    async   showEditDialog (id) {
      // eslint-disable-next-line no-unused-vars
      const { data: res } = await this.$http.get('roles/' + id)
      if (res.meta.status !== 200) {
        return this.$message.error('用户查询信息失败！')
      }
      this.editRolesdialog = true
      this.editRoles = res.data
    },
    editRolesList () {
      this.$refs.editRolesRefs.validate(async (valid) => {
        if (!valid) return
        const { data: res } = await this.$http.put('roles/' + this.editRoles.roleId, {
          roleName: this.editRoles.roleName,
          roleDesc: this.editRoles.roleDesc
        })
        if (res.meta.status !== 200) {
          return this.$message.error('角色跟新列表失败！')
        }
        this.editRolesdialog = false
        this.getRolesList()
        this.$message.success('更新列表成功！')
      })
    },
    // 根据角色删除权限
    async  removeById (item, id) {
      const confirm = await this.$confirm('此操作将永久删除该权限, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)
      if (confirm !== 'confirm') {
        return this.$message.info('删除已取消')
      }
      const { data: res } = await this.$http.delete(`roles/${item.id}/rights/${id}`)
      if (res.meta.status !== 200) {
        return this.$message.error('删除失败！')
      }
      this.$message.success('删除成功')
      item.children = res.data
    },
    async rolesTreeDialog (items) {
      this.roleId = ''
      this.treedialog = true
      this.dialogRolesKyes = []
      this.dialogKeys = []
      const { data: res } = await this.$http.get('rights/tree')
      if (res.meta.status !== 200) {
        return this.$message.error('获取权限列表失败！')
      }
      this.treeList = res.data
      this.roleId = items.id
      const item = items.children
      for (let i = 0; i < item.length; i++) {
        const children1 = []
        for (let j = 0; j < item[i].children.length; j++) {
          const children2 = []
          children1.push(children2)
          for (let z = 0; z < item[i].children[j].children.length; z++) {
            this.dialogKeys.push(item[i].children[j].children[z].id)
            children2.push(item[i].children[j].children[z].id)
          }
          children1.push(item[i].children[j].id)
          children1.push(children2)
        }
        this.dialogRolesKyes.push(item[i].id)
        this.dialogRolesKyes.push(children1)
      }
    },
    async  addTree () {
      const { data: res } = await this.$http.post(`roles/${this.roleId}/rights`,
        {
          roleId: this.roleId,
          rids: this.$refs.tree.getCheckedKeys()
        })
      if (res.meta.status !== 200) return this.$message.error('添加权限失败')
      this.$message.success('添加成功')
      this.treedialog = false
      this.getRolesList()
    }
  }
}
</script>
<style lang="less">
.el-tag{
  margin: 8px;
}
.btop{
 border-top: 1px solid #eee;
}
.bottom{
 border-bottom: 1px solid  #eee ;
}
.v-tag-center{
  display: flex;
  align-items: center;
}
</style>
