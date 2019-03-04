<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='3')
        el-select(placeholder='请选择' v-model='form.name' clearable).w100
          el-option(:value='item.value' :label='item' v-for='item in dateType')
      el-col(:span='6' style='margin-top:5px')
        el-switch(v-model='form.name1' active-text='按日查询' inactive-text='按月查询' active-value='date' inactive-value='month')
      el-col(:span='6')
        el-date-picker(:type='form.name1' placeholder='请选择日期' v-model='form.name2').w100
      el-col(:span='6')
        el-input(placeholder='请输入' v-model='form.name1' clearable).w100
      el-col(:span='3' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='[{}]' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='流水号' prop='')
      el-table-column(label='任务编号')
        template(slot-scope='{row}')
          router-link(:to='{name: "onlineMission"}') 1234
      el-table-column(label='用户编号' prop='')
      el-table-column(label='用户名' prop='')
      el-table-column(label='时间' prop='')
      el-table-column(label='客户付款' prop='')
      el-table-column(label='兼职成本' prop='')
      el-table-column(label='收入' prop='')
      el-table-column(label='任务状态' prop='')
      el-table-column(label='备注' prop='')
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.currentPage' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
import mixin from '@/mixin'
import {dateType} from '@/enums'

export default {
  mixins: [mixin],
  data() {
    return {
      dateType,
      form: {
        name: '',
        name1: 'date',
        name2: '',
        currentPage: 1
      },
      pagination: {
        totalCount: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    create() {

    },
    getList() {
      const {name, name1, currentPage} = this.$route.query

      this.form.name = name || ''
      this.form.name1 = name1 || 'date'
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

