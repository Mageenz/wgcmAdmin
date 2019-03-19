<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.userType' clearable).w100
          el-option(:value='key' :label='item' v-for='(item, key) in userType')
      el-col(:span='6')
        el-input(placeholder='请输入用户名' v-model='form.name' clearable).w100
      el-col(:span='6' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='用户编号')
        template(slot-scope='{row}')
          router-link(:to='{name: "userDetail", query: {id: row.cid, userType: form.userType}}') {{row.cid}}
      el-table-column(label='用户名' prop='cname')
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
import mixin from '@/mixin'
import {userType} from '@/enums'

export default {
  mixins: [mixin],
  data() {
    return {
      userType,
      form: {
        userType: 'Receiver',
        name: '',
        page: 1
      },
      pagination: {
        totalCount: 1,
        pageSize: 10
      },
      list: []
    }
  },
  methods: {
    async getList() {
      const {userType, name, page} = this.$route.query

      this.form.userType = userType || 'Receiver'
      this.form.name = name || ''
      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}
      const res = await API.user.getUserList(params)

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

