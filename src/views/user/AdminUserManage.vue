<template lang="pug">
  .page-container
    .page-operatebar
      el-button(type='primary' @click='create') 添加管理员
    el-table(:data='[{}]' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='用户名')
      el-table-column(label='用户类型' prop='')
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text') 删除
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.currentPage' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
    el-dialog(:visible.sync='isDialogShow' title='添加管理员' width='50%')
      el-form(label-width='100px' label-position='right')
        el-form-item(label='类型：' prop='')
          el-select(placeholder='请选择' v-model='form1.name' clearable).w300
            el-option(:value='key' :label='item' :key='key' v-for='(item, key) in userType1')
        el-form-item(label='用户名：' prop='')
          el-input(placeholder='请输入用户名' v-model='form.name' clearable).w300
        el-form-item(label='密码：' prop='')
          el-input(placeholder='请输入密码' v-model='form.name' clearable).w300
        el-form-item(label='头像：' prop='')
          el-upload(action='/api/file/upload' :file-list='fileList' list-type='picture-card' :limit='1' :on-success='handleUploadSuccess' :on-preview="handlePictureCardPreview" :on-remove="handleRemove")
            <i class="el-icon-plus"></i>
            .c3(slot='tip') 只能上传jpg/png文件，且不超过500kb
      .p-foot(slot='footer')
        el-button(type='primary') 提交
        el-button(@click='isDialogShow=false') 取消
</template>

<script>
import mixin from '@/mixin'
import {userType1} from '@/enums'

export default {
  mixins: [mixin],
  data() {
    return {
      userType1,
      form: {
        name: 'Receiver',
        name1: '',
        currentPage: 1
      },
      isDialogShow: false,
      form1: {
        name: '0'
      },
      fileList: [],
      pagination: {
        totalCount: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    create() {
      this.isDialogShow = true
    },
    handleUploadSuccess() {},
    handlePictureCardPreview() {},
    handleRemove() {},
    getList() {
      const {name, name1, currentPage} = this.$route.query

      this.form.name = name || 'Receiver'
      this.form.name1 = name1 || ''
      this.form.currentPage = +currentPage || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      // 请求接口
      console.log('params', params)
    },
    search() {
      this.appendSearchParamsToRoute({...this.form})
      this.getList()
    }
  }
}
</script>

