<template lang="pug">
  .page-container
    .page-operatebar
      el-button(type='primary' @click='create') 新建
    el-table(:data='[{}]' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='组名' prop='')
        template(slot-scope='{row}')
          router-link(to='/') 123
      el-table-column(label='成员' prop='')
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text') 删除
    el-dialog(:visible.sync='isDialogShow' title='添加小组' width='40%')
      el-form(label-width='100px' label-position='right')
        el-form-item(label='小组名：' prop='')
          el-input(placeholder='请输入小组名' v-model='form.name' clearable).w300
      .p-foot(slot='footer')
        el-button(type='primary') 提交
        el-button(@click='isDialogShow=false') 取消
</template>

<script>
export default {
  data() {
    return {
      form: {
        name: ''
      },
      isDialogShow: false
    }
  },
  methods: {
    create() {
      this.isDialogShow = true
    },
    getList() {

    }
  }
}
</script>