<template lang="pug">
  .page-container
    .page-operatebar
      el-button(type='primary' @click='isDialogShow = true') 添加管理员
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='用户名' prop='aname')
      el-table-column(label='用户类型' prop='atype')
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text' @click='deleteAdmin(row)') 删除
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
    el-dialog(:visible.sync='isDialogShow' title='添加管理员' width='50%')
      el-form(label-width='100px' label-position='right' :model='dForm' :rules='rules' ref='form')
        el-form-item(label='类型：' prop='')
          el-select(placeholder='请选择' v-model='dForm.adminType').w300
            el-option(:value='key' :label='item' :key='key' v-for='(item, key) in userType1')
        el-form-item(label='用户名：' prop='userName')
          el-input(placeholder='请输入用户名' v-model='dForm.userName' clearable).w300
        el-form-item(label='密码：' prop='password')
          el-input(placeholder='请输入密码' v-model='dForm.password' clearable).w300
        el-form-item(label='头像：' prop='file')
          el-upload(action='/api/file/upload' :auto-upload='false' list-type='picture-card' :limit='1' :on-change='handleChange')
            <i class="el-icon-plus"></i>
            .c3(slot='tip') 只能上传jpg/png文件，且不超过500kb
      .p-foot(slot='footer')
        el-button(type='primary' @click='submit') 提交
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
        page: 1
      },
      isDialogShow: false,
      dForm: {
        adminType: '0',
        userName: '',
        password: '',
        file: null
      },
      rules: {
        userName: [
          {required: true, message: '请输入用户名'}
        ],
        password: [
          {required: true, message: '请输入密码'}
        ],
        file: [
          {required: true, message: '请上传头像'}
        ]
      },
      list: [],
      fileList: [],
      pagination: {
        totalCount: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    deleteAdmin(row) {
      this.$confirm('此操作将删除该管理员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await API.user.deleteAdmin({
          delUserId: row.aid,
        })

        if(res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getList()
        }
      })
    },
    submit() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          const res = await API.user.addAdmin(this.dForm)

          if(res.data.code === 100) {
            this.$message.success('新增成功')
            this.isDialogShow = false
            this.$refs.form.resetFields()
            this.getList()
          }
        }
      })
    },
    handleChange(file) {
      this.dForm.file = file.raw
    },
    async getList() {
      const {page} = this.$route.query

      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      const res = await API.user.adminManagement(params)

      if(res.data.code === 100) {
        this.list = res.data.data.list
        this.pagination.totalCount = res.data.data.total
      }
    },
    search() {
      this.appendSearchParamsToRoute({...this.form})
      this.getList()
    }
  }
}
</script>

