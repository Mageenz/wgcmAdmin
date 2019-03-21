<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.taskStatus').w100
          el-option(:value='key' :label='item' v-for='(item, key) in missionStatus')
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.userType' clearable).w100
          el-option(value='0' label='后台')
          el-option(value='1' label='后台客户')
      el-col(:span='6')
        el-input(placeholder='请输入关键词' v-model='form.taskId' clearable).w100
      el-col(:span='6' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='任务编号')
        template(slot-scope='{row}')
          router-link(:to='{name: "onlineMission", query: {operateType: "online", releaseTaskId: $route.query.releaseTaskId, taskId: row.tid, taskType: "ReleaseTask", taskAddUserType: row.taddUserType}}') {{row.tid}}
      el-table-column(label='平台' prop='platformName')
      el-table-column(label='方向' prop='tdirection')
      el-table-column(label='数量')
        template(slot-scope='{row}')
          router-link(:to='{name: "acceptMissionList", query: {releaseTaskId: row.tid}}') {{row.trequiredquan}}/{{row.tleftquan}}
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          //- 任务状态 0为待审核/1为进行中/2为暂停/3为已完成/4为未通过审核/5为已退款
          el-button(type='text' @click='foundation(row, 999)' v-if='row.sort === 0') 置顶
          el-button(type='text' @click='foundation(row, 0)' v-if='row.sort === 999') 取消置顶
          el-button(type='text' @click='updateReleaseStatus(row, 2)' v-if='row.tstatus !== 2') 暂停
          el-button(type='text' @click='updateReleaseStatus(row, 1)' v-if='row.tstatus === 2') 继续
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
        userType: '0',
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
    async updateReleaseStatus(row, taskStatus) {
      const res = await API.mission.updateReleaseStatus({
        taskId: row.tid,
        taskStatus
      })

      if(res.data.code === 100) {
        this.$message.success('暂停成功')
        this.getList()
      }
    },
    async foundation(row, status) {
      const res = await API.mission.foundation({
        status: status,
        tId: row.tid
      })

      if(res.data.code === 100) {
        this.$message.success('操作成功')
        this.getList()
      }
    },
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

