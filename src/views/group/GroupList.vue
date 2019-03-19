<template lang="pug">
  .page-container
    .page-operatebar
      el-button(type='primary' @click='isDialogShow = true') 新建小组
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='组名' prop='gname')
      el-table-column(label='成员')
        template(slot-scope='{row}') {{row.gnum}}/{{row.gmax}}
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text' @click='editGroup(row)') 修改组名
          el-button(type='text' @click='$router.push({name: "groupDetail", query: {groupId: row.gid}})') 查看小组成员
          el-button(type='text' @click='deleteGroup(row)') 删除
    el-dialog(:visible.sync='isDialogShow' title='添加小组' width='40%')
      el-form(label-width='100px' label-position='right' ref='form' :model='form' :rules='rules')
        el-form-item(label='小组名：' prop='groupName')
          el-input(placeholder='请输入小组名' v-model='form.groupName' clearable).w300
      .p-foot(slot='footer')
        el-button(type='primary' @click='submit') 提交
        el-button(@click='isDialogShow=false') 取消
</template>

<script>
export default {
  data() {
    return {
      form: {
        groupName: ''
      },
      rules: {
        groupName: [
          {required: true, message: '请输入小组名'}
        ]
      },
      list: [],
      isDialogShow: false,
      groupId: ''
    }
  },
  methods: {
    editGroup(row) {
      this.isDialogShow = true
      this.groupId = row.gid
      this.form.groupName = row.gname
    },
    async edit() {
      const res = await API.group.changeGroupName({
        groupId: this.groupId,
        groupName: this.form.groupName
      })

      if(res.data.code === 100) {
        this.$message.success('修改成功')
        this.isDialogShow = false
        this.form.groupName = ''
        this.groupId = ''
        this.groupManagement()
      }
    },
    async submit() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          if(this.groupId !== '') {
            this.edit()
            return
          }
          const res = await API.group.buildGroup(this.form)

          if(res.data.code === 100) {
            this.$message.success('操作成功')
            this.isDialogShow = false
            this.form.groupName = ''
            this.$refs.form.clearValidate()
            this.groupManagement()
          }
        }
      })
    },
    deleteGroup(row) {
      this.$confirm('此操作将删除该组, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await API.group.deleteGroup({
          groupId: row.gid,
          groupNum: row.gnum
        })

        if(res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.groupManagement()
        }
      })
    },
    async groupManagement() {
      const res = await API.group.groupManagement()

      if(res.data.code === 100) {
        this.list = res.data.data.list
      }
    }
  },
  mounted() {
    this.groupManagement()
  }
}
</script>