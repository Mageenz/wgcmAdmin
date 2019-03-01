<template lang='pug'>
  .page-container
    .page-top-tip 朋友圈直发订单：产品单价为 3.0 元/个，最低消费数量为 1 个。
    el-form(label-width='100px' label-position='right')
      el-form-item(label='平台' prop='')
        el-select(placeholder='请选择' v-model='form.name' clearable).w300
          el-option(value='1' label='微信')
      el-form-item(label='类型：' prop='')
        el-select(placeholder='请选择' v-model='form.name' clearable).w300
          el-option(value='1' label='微信')
      el-form-item(label='方向选择：' prop='')
        el-select(placeholder='请选择' v-model='form.name' clearable).w300
          el-option(value='1' label='微信')
      el-form-item(label='链接：' prop='')
        el-input(placeholder='请输入链接' v-model='form.name' clearable).w300
      el-form-item(label='数量：' prop='')
        el-input(placeholder='请输入数量' v-model='form.name' clearable).w300
      el-form-item(label='备注' prop='')
        el-input(placeholder='请输入备注' type='textarea' v-model='form.name' clearable).w600
      el-form-item(label='' prop='')
        el-checkbox-group(v-model='form.name')
          el-checkbox(label='1') 【记得互相点赞好评！优先点赞带图评论！】
      el-form-item(label='' prop='')
        el-button(type='primary') 发布任务
        el-button 取消
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '1'
      }
    }
  }
}
</script>
<style lang='less' scoped>

</style>