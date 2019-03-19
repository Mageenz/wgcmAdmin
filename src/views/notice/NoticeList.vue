<template lang="pug">
  .page-container
    .page-operatebar
      el-button(type='primary' @click='isDialogShow = true') 创建公告
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='公告编号' prop='nid')
      el-table-column(label='公告标题' prop='ntitle')
      el-table-column(label='公告内容' prop='ncontent')
      el-table-column(label='新建时间' prop='ndate')
      el-table-column(label='管理员' prop='adminName')
    el-dialog(:visible.sync='isDialogShow' title='新建公告' width='40%')
      el-form(label-width='100px' label-position='right' ref='form' :model='dForm' :rules='rules')
        el-form-item(label='标题：' prop='noticeTitle')
          el-input(placeholder='请输入小组名' v-model='dForm.noticeTitle' clearable).w300
        el-form-item(label='内容：' prop='noticeContent')
          el-input(placeholder='请输入内容' v-model='dForm.noticeContent' type='textarea' clearable :rows='6').w300
      .p-foot(slot='footer')
        el-button(type='primary' @click='submit') 提交
        el-button(@click='isDialogShow=false') 取消
</template>

<script>
import mixin from '@/mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        page: 1
      },
      dForm: {
        noticeTitle: '',
        noticeContent: ''
      },
      rules: {
        noticeTitle: [
          {required: true, message: '请输入标题'}
        ],
        noticeContent: [
          {required: true, message: '请输入内容'}
        ]
      },
      isDialogShow: false,
      pagination: {
        totalCount: 1,
        pageSize: 10
      },
      list: []
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          const res = await API.notice.add(this.dForm)

          if(res.data.code === 100) {
            this.$message.success('新增成功')
            this.isDialogShow = false
            this.$refs.form.resetFields()
            this.getList()
          }
        }
      })
    },
    async getList() {
      const {page} = this.$route.query

      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      const res = await API.notice.searchAll(params)

      if(res.data.code === 100) {
        this.list = res.data.data.list
        this.pagination.totalCount = res.data.data.total
      }
    }
  }
}
</script>