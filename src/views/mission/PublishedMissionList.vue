<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.taskStatus' clearable).w100
          el-option(:value='key' :label='item' v-for='(item, key) in missionStatus')
      el-col(:span='6')
        el-input(placeholder='请输入关键词' v-model='form.taskId' clearable).w100
      el-col(:span='6' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='任务编号')
        template(slot-scope='{row}')
          router-link(:to='{name: "onlineMission", query: {operateType: "online", releaseTaskId: $route.query.releaseTaskId, taskId: row.tid, taskType: "ReceiveTask", taskAddUserType: row.taddUserType}}') {{row.tid}}
      el-table-column(label='平台' prop='platformName')
      el-table-column(label='方向' prop='tdirection')
      el-table-column(label='数量')
        template(slot-scope='{row}')
          router-link(:to='{name: "acceptMissionList", query: {releaseTaskId: row.tid}}') {{row.trequiredquan}}/{{row.tleftquan}}
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
import mixin from '@/mixin'
import {missionStatus} from '@/enums'

export default {
  mixins: [mixin],
  data() {
    return {
      missionStatus,
      form: {
        taskStatus: '1',
        taskId: '',
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
    getList() {
      const {taskStatus, taskId, page} = this.$route.query

      this.form.taskStatus = taskStatus || '1'
      this.form.taskId = taskId || ''
      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      API.mission.taskView(params).then(res => {
        if(res.data.code === 100) {
          this.list = res.data.data.list
        }
      })
    },
    search() {
      this.appendSearchParamsToRoute({...this.form})
      this.getList()
    }
  }
}
</script>

