<template lang='pug'>
  .page-container
    .page-operatebar
      el-button(type='primary' @click='create') 新建平台
    el-table(:data='[{}]' border stripe)
      el-table-column(type='index')
      el-table-column(label='平台编号' prop='')
      el-table-column(label='平台名称' prop='')
      el-table-column(label='logo' prop='')
      el-table-column(label='操作' prop='' width='100')
        el-button(type='text') 删除
    el-dialog(:visible.sync='isDialogShow' title='新建平台' width='50%')
      el-form(label-width='100px' label-position='right')
        el-form-item(label='名称' prop='')
          el-input(placeholder='请输入名称' v-model='form.name' clearable).w300
        el-form-item(label='任务账号上限：' prop='')
          el-input(placeholder='请输入任务账号上限' v-model='form.name' clearable).w300
        el-form-item(label='任务账号类型：' prop='')
          el-select(placeholder='请选择任务账号类型' v-model='form.name' clearable).w300
            el-option(value='1' label='uid')
            el-option(value='2' label='账号名称')
        el-form-item(label='logo' prop='')
          el-upload(action='/api/file/upload' :file-list='fileList' list-type='picture-card' :limit='1' :on-success='handleUploadSuccess' :on-preview="handlePictureCardPreview" :on-remove="handleRemove")
            <i class="el-icon-plus"></i>
            .c3(slot='tip') 只能上传jpg/png文件，且不超过500kb
      .p-foot(slot='footer')
        el-button(type='primary') 创建
        el-button(@click='isDialogShow=false') 取消
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: ''
      },
      fileList: [],
      isDialogShow: false
    }
  },
  methods: {
    handleUploadSuccess() {},
    handlePictureCardPreview() {},
    handleRemove() {},
    create() {
      this.isDialogShow = true
    }
  }
}
</script>
<style lang='less' scoped>

</style>