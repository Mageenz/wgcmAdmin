<template lang="pug">
  .page-container
    table.page-table-info
      tr
        th 编号：
        td 123
        th 平台：
        td 微信
      tr
        th 用户：
        td 123
        th 类型：
        td 123
      tr
        th 链接：
        td wwww
        th 数量：
        td
          span.mr15 0/13
          el-button(type='primary' @click='isDialogShow = true') 增加数量
      tr
        th 金额：
        td wwww
        th 状态：
        td 2213
      tr
        th 方向：
        td(colspan='3') xxx
    .page-foot
      el-button(type='primary') 完成任务
      el-button(@click='$router.go(-1)') 返回
    el-dialog(width='30%' :visible.sync='isDialogShow' title='增加数量')
      el-form(label-width='100px' label-position='right')
        el-form-item 目前数量为12，单价为13元
        el-form-item(label='数量：' prop='')
          el-input(placeholder='请输入数量' v-model='dForm.name' clearable)
      .d-foot(slot='footer')
        el-button(type='primary') 提交 
</template>

<script>
export default {
  data() {
    return {
      form: {},
      dForm: {
        name: ''
      },
      isDialogShow: false
    }
  },
  methods: {
    getInfo() {
      API.mission.taskDetail(this.form).then(res => {
        if(res.data.code === '0') {
          
        }
      })
    }
  },
  mounted() {
    const {taskId, taskType, taskAddUserType} = this.$route.query

    this.form = {taskId, taskType, taskAddUserType}
    this.getInfo()
  }
}
</script>

