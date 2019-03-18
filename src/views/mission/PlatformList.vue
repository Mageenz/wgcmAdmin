<template lang='pug'>
  .page-container
    .page-operatebar
      el-button(type='primary' @click='create') 新建平台
    el-table(:data='list' border stripe)
      el-table-column(type='index')
      el-table-column(label='平台编号' prop='pid')
      el-table-column(label='平台名称' prop='pname')
      el-table-column(label='logo')
        template(slot-scope='{row}')
          img(:src='`${ENV}${row.plogo}`' width='30' style='vertical-align: middle')
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text' @click='$router.push({name: "categoryList", query: {platformId: row.pid, pname: row.pname}})') 查看任务类型
          el-button(type='text' @click='editName(row)') 修改名称
          el-button(type='text' @click='delPlatform(row)') 删除
    el-dialog(:visible.sync='isDialogShow1' title='修改平台名称' width='50%')
      el-form(label-width='120px' label-position='right')
        el-form-item(label='平台名称：' prop='')
          el-input(placeholder='请输入平台名称' v-model='form1.platformName' clearable).w300
      .p-foot(slot='footer')
        el-button(type='primary' @click='edit') 修改
        el-button(@click='isDialogShow1=false') 取消
    el-dialog(:visible.sync='isDialogShow' title='新建平台' width='50%')
      el-form(label-width='120px' label-position='right' :model='form' :rules='rules' ref='form')
        el-form-item(label='名称:' prop='platformName')
          el-input(placeholder='请输入名称' v-model='form.platformName' clearable).w300
        el-form-item(label='任务账号上限：' prop='taskAccountLimit')
          el-input(placeholder='请输入任务账号上限' v-model='form.taskAccountLimit' clearable).w300
        el-form-item(label='任务账号类型：' prop='')
          el-select(placeholder='请选择任务账号类型' v-model='form.taskAccountType').w300
            el-option(value='1' label='uid')
            el-option(value='2' label='账号名称')
        el-form-item(label='logo:' prop='file')
          el-upload(:auto-upload="false" :action='action' list-type='picture-card' :limit='1' :on-change='handleChange' :on-remove="handleRemove")
            <i class="el-icon-plus"></i>
            .upload-tip(slot='tip') 只能上传jpg/png文件，且不超过500kb
      .p-foot(slot='footer')
        el-button(type='primary' @click='submit') 创建
        el-button(@click='isDialogShow=false') 取消
</template>
<script>
export default {
  data() {
    return {
      ENV,
      form: {
        platformName: '',
        file: null,
        taskAccountLimit: '',
        taskAccountType: '1'
      },
      rules: {
        platformName: [
          {required: true, message: '请输入平台名称'}
        ],
        taskAccountLimit: [
          {required: true, message: '请输入任务账号上限'}
        ],
        file: [
          {required: true, message: '请上传logo'}
        ]
      },
      fileList: [],
      isDialogShow: false,
      isDialogShow1: false,
      form1: {
        platformName: '',
        platformId: ''
      },
      list: [],
      action: `${ENV}/Task/uploadMedia`,
    }
  },
  methods: {
    editName(row) {
      this.isDialogShow1 = true
      this.form1.platformName = row.pname
      this.form1.platformId = row.pid
    },
    async edit() {
      const res = await API.mission.editPlatform(this.form1)

      if(res.data.code === 100) {
        this.$message.success('修改成功')
        this.isDialogShow1 = false
        this.getPlatformList()
      }
    },
    delPlatform(row) {
      this.$confirm('此操作将删除该平台, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await API.mission.delPlatform({
          platformId: row.pid
        })

        if(res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getPlatformList()
        }
      })
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          const res = await API.mission.addPlatform(this.form)

          if(res.data.code === 100) {
            this.$message.success('添加成功')
            this.isDialogShow = false
            this.form = {
              platformName: '',
              file: null,
              taskAccountLimit: '',
              taskAccountType: '1'
            }
            this.getPlatformList()
          }
        }
      })
    },
    handleChange(file, fileList) {
      console.log('f', file)
      this.form.file = file.raw
    },
    handleRemove() {
      this.form.file = null
    },
    create() {
      this.isDialogShow = true
    },
    async getPlatformList() {
      const res = await API.mission.getPlatformList()

      if(res.data.code === 100) {
        this.list = res.data.data
      }
    }
  },
  mounted() {
    this.getPlatformList()
  }
}
</script>
<style lang='less' scoped>

</style>