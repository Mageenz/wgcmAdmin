<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='3')
        el-select(placeholder='请选择' v-model='searchType').w100
          el-option(:value='key' :label='item' v-for='(item, key) in dateType')
      el-col(:span='6' style='margin-top:5px' v-if='searchType === "0"')
        el-switch(v-model='form.checkWay' active-text='按日查询' inactive-text='按月查询' active-value='day' inactive-value='month')
      el-col(:span='6' v-if='searchType === "0"')
        el-date-picker(:type='dateType1[form.checkWay]' placeholder='请选择日期' v-model='form.date' value-format='yyyy-MM-dd').w100
      el-col(:span='6' v-if='searchType === "1"')
        el-date-picker(type='date' v-model='form.fromDate' placeholder='开始日期' value-format='yyyy-MM-dd').w100
      el-col(:span='6' v-if='searchType === "1"')
        el-date-picker(type='date' v-model='form.toDate' placeholder='结束日期' value-format='yyyy-MM-dd').w100
      el-col(:span='3')
        el-input(placeholder='用户编号' v-model='form.searchUserId' clearable).w100
      el-col(:span='3' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='流水号' prop='billId')
      el-table-column(label='任务编号' prop='releaseTask')
      el-table-column(label='用户编号' prop='userId')
      el-table-column(label='用户名' prop='userName')
      el-table-column(label='时间' prop='billDate')
      el-table-column(label='客户付款' prop='totalPay')
      el-table-column(label='兼职成本' prop='receiverCost')
      el-table-column(label='收入' prop='income')
      el-table-column(label='任务状态' prop='taskStatus')
      el-table-column(label='备注' prop='remark')
      el-table-column(label='操作')
        template(slot-scope='{row}')
          el-button(type='text' @click='addRemark(row)') 添加备注
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
    el-dialog(:visible.sync='isDialogShow' title='添加备注' width='50%')
      el-form(label-width='100px' label-position='right')
        el-form-item(label='流水号：' prop='') {{dForm.billId}}
        el-form-item(label='备注内容：' prop='')
          el-input(placeholder='请输入备注' v-model='dForm.remark' clearable).w300
      .p-foot(slot='footer')
        el-button(type='primary' @click='submit') 提交
        el-button(@click='isDialogShow=false') 取消
</template>

<script>
import mixin from '@/mixin'
import {dateType} from '@/enums'
import {formatTime} from '@/utils'

export default {
  mixins: [mixin],
  data() {
    return {
      dateType,
      dateType1: {
        'date': 'day',
        'month': 'month'
      },
      searchType: '0',
      form: {
        checkWay: 'date',
        date: '',
        searchUserId: '',
        page: 1,
        fromDate: '',
        toDate: ''
      },
      pagination: {
        totalCount: 1,
        pageSize: 20
      },
      list: [],
      isDialogShow: false,
      dForm: {
        billId: '',
        remark: ''
      }
    }
  },
  methods: {
    addRemark(row) {
      this.isDialogShow = true
      this.dForm.billId = row.billId
      this.dForm.remark = row.remark
    },
    async submit() {
      const res = await API.bill.updateRemark(this.dForm)

      if(res.data.code === 100) {
        this.$message.success('提交成功')
        this.isDialogShow = false
        this.getList()
      }
    },
    async getList() {
      const {searchType, date, searchUserId, checkWay, fromDate, toDate, page} = this.$route.query
      
      this.searchType = searchType || '0'
      this.form.date = date || formatTime(Date.now())
      this.form.checkWay = checkWay || 'day'
      this.form.searchUserId = searchUserId
      this.form.page = +page || 1
      this.form.fromDate = fromDate
      this.form.toDate = toDate
      
      if(this.searchType === '0') {
        const res = await API.bill.getFinancialBillByDate({
          checkWay: this.form.checkWay,
          date: this.form.date,
          searchUserId: this.form.searchUserId,
          page: this.form.page
        })

        if(res.data.code === 100) {
          this.list = res.data.data.financialBill.list
          this.pagination.totalCount = res.data.data.financialBill.total
        }
      }

      if(this.searchType === '1') {
        const res = await API.bill.getFinancialBillByDateRange({
          fromDate: this.form.fromDate,
          toDate: this.form.toDate,
          searchUserId: this.form.searchUserId,
          page: this.form.page
        })

        if(res.data.code === 100) {
          this.list = res.data.data.financialBill.list
          this.pagination.totalCount = res.data.data.financialBill.total
        }
      }
    },
    search() {
      this.form.page = 1
      let data = {}
      const {date, searchUserId, checkWay, fromDate, toDate, page} = this.form

      if(this.searchType === '0') {
        data = {
          searchType: this.searchType,
          checkWay,
          date,
          searchUserId,
          page
        }
      }

      if(this.searchType === '1') {
        data = {
          searchType: this.searchType,
          fromDate,
          toDate,
          searchUserId,
          page
        }
      }
      this.appendSearchParamsToRoute(data)
      this.getList()
    }
  }
}
</script>

