<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.taskStatus' clearable).w100
          el-option(:value='key' :label='item' v-for='(item, key) in missionStatus1')
      //- el-col(:span='6')
        //- el-input(placeholder='请输入关键词' v-model='form.name1' clearable).w100
      el-col(:span='6' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='任务编号')
        template(slot-scope='{row}')
          router-link(:to='{name: "missionCheck", query: {operateType: "receiveTaskCheck", taskType: "ReceiveTask", taskId: row.tid, taskAddUserType: row.taddUserType}}') {{row.tid}}
      el-table-column(label='姓名' prop='userName')
      el-table-column(label='接单时间' prop='tdate' :formatter='timeFormater')
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
import mixin from '@/mixin'
import {missionStatus1} from '@/enums'
import {formatTime} from '@/utils'

export default {
  mixins: [mixin],
  data() {
    return {
      missionStatus1,
      form: {
        releaseTaskId: '',
        taskId: '',
        taskStatus: '0',
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
    timeFormater(r, c, v, i) {
      return formatTime(v)
    },
    async getList() {
      const {releaseTaskId, taskStatus, taskId, page} = this.$route.query

      this.form.releaseTaskId = releaseTaskId
      this.form.taskStatus = taskStatus || '0'
      this.form.taskId = taskId || ''
      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      const res = await API.mission.receiveTaskView(params)

      if(res.data.code === 100) {
        this.list = res.data.data.list
      }
    },
    search() {
      this.appendSearchParamsToRoute({...this.form})
      this.getList()
    }
  }
}
</script>
