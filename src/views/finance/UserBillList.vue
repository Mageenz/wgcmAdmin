<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='3')
        el-select(placeholder='请选择' v-model='searchType').w100
          el-option(:value='key' :label='item' v-for='(item, key) in dateType')
      el-col(:span='6' style='margin-top:5px' v-if='searchType === "0"')
        el-switch(v-model='form.checkWay' active-text='按日查询' inactive-text='按月查询' active-value='day' inactive-value='month')
      el-col(:span='4' v-if='searchType === "0"')
        el-date-picker(:type='dateType1[form.checkWay]' placeholder='请选择日期' v-model='form.date' value-format='yyyy-MM-dd').w100
      el-col(:span='4' v-if='searchType === "1"')
        el-date-picker(type='date' v-model='form.fromDate' placeholder='开始日期' value-format='yyyy-MM-dd').w100
      el-col(:span='4' v-if='searchType === "1"')
        el-date-picker(type='date' v-model='form.toDate' placeholder='结束日期' value-format='yyyy-MM-dd').w100
      el-col(:span='4')
        el-select(placeholder='请选择' v-model='form.billType')
          el-option(:value='key' :label='item' :key='key' v-for='(item, key) in billType')
      el-col(:span='3')
        el-input(placeholder='用户编号' v-model='form.searchUserId' clearable).w100
      el-col(:span='3' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='流水号' prop='bid')
      el-table-column(label='任务编号' prop='receivedTaskId')
      el-table-column(label='用户编号' prop='buid')
      el-table-column(label='用户名' prop='userName')
      el-table-column(label='时间' prop='bdate')
      el-table-column(label='金额' prop='bamount')
      el-table-column(label='状态')
        template(slot-scope='{row}')
          el-button(type='text' @click='changeBillStatus(row)' v-if='form.billStatus === "receiverSalary"') 结算
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
import mixin from '@/mixin'
import {dateType, billType} from '@/enums'
import {formatTime} from '@/utils'

export default {
  mixins: [mixin],
  data() {
    return {
      dateType,
      billType,
      dateType1: {
        'date': 'day',
        'month': 'month'
      },
      searchType: '0',
      form: {
        billType: '',
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
    async changeBillStatus(row) {
      this.$confirm('确定结算?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await API.bill.changeBillStatus({
          billId: row.bid,
          billStatus: row.bstatus,
          amount: row.bamount,
          receiverId: row.buid
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
    async getList() {
      const {searchType, date, searchUserId, checkWay, fromDate, toDate, page, billType} = this.$route.query
      
      this.searchType = searchType || '0'
      this.form.date = date || formatTime(Date.now())
      this.form.checkWay = checkWay || 'day'
      this.form.searchUserId = searchUserId
      this.form.page = +page || 1
      this.form.fromDate = fromDate
      this.form.toDate = toDate
      this.form.billType = billType || 'clientRecharge'
      
      if(this.searchType === '0') {
        const res = await API.bill.getBillByDate({
          checkWay: this.form.checkWay,
          date: this.form.date,
          searchUserId: this.form.searchUserId,
          billType: this.form.billType,
          page: this.form.page
        })

        if(res.data.code === 100) {
          this.list = res.data.data.clientBill.list
          this.pagination.totalCount = res.data.data.clientBill.total
        }
      }

      if(this.searchType === '1') {
        const res = await API.bill.getBillByDateRange({
          fromDate: this.form.fromDate,
          toDate: this.form.toDate,
          searchUserId: this.form.searchUserId,
          billType: this.form.billType,
          page: this.form.page
        })

        if(res.data.code === 100) {
          this.list = res.data.data.clientBill.list
          this.pagination.totalCount = res.data.data.clientBill.total
        }
      }
    },
    search() {
      this.form.page = 1
      let data = {}
      const {date, searchUserId, checkWay, fromDate, toDate, page, billType} = this.form

      if(this.searchType === '0') {
        data = {
          searchType: this.searchType,
          checkWay,
          date,
          searchUserId,
          page,
          billType
        }
      }

      if(this.searchType === '1') {
        data = {
          searchType: this.searchType,
          fromDate,
          toDate,
          searchUserId,
          page,
          billType
        }
      }
      this.appendSearchParamsToRoute(data)
      this.getList()
    }
  }
}
</script>

