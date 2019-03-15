<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.taskType').w100
          el-option(:value='item.value' :label='item.name' v-for='item in items')
      el-col(:span='6')
        el-input(placeholder='请输入' v-model='form.taskId' clearable).w100
      el-col(:span='6' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='list' border stripe v-show='taskType === "ReleaseTask"').page-table
      el-table-column(type='index')
      el-table-column(label='发布任务编号' prop='tid')
        template(slot-scope='{row}')
          router-link(:to='{name: "missionCheck", query: {operateType: "releaseTaskCheck", taskType: taskType, taskId: row.tid, taskAddUserType: row.taddUserType}}') {{row.tid}}
      el-table-column(label='平台' prop='platformName')
      el-table-column(label='方向' prop='tdirection')
      el-table-column(label='数量')
        template(slot-scope='{row}') {{row.trequiredquan}}/{{row.tleftquan}}
    el-table(:data='list' border stripe v-show='taskType === "ReceiveTask"').page-table
      el-table-column(type='index')
      el-table-column(label='接单任务编号' prop='tid')
        template(slot-scope='{row}')
          router-link(:to='{name: "missionCheck", query: {operateType: "receiveTaskCheck", releaseTaskId: row.ttid, taskType: taskType, taskId: row.tid, taskAddUserType: row.tAddUserType}}') {{row.tid}}
      el-table-column(label='发布任务编号' prop='ttid')
      el-table-column(label='平台' prop='platformName')
      el-table-column(label='用户' prop='userName')
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
import mixin from '@/mixin'

export default {
  mixins: [mixin],
  data() {
    return {
      form: {
        taskType: 'ReleaseTask',
        taskId: '',
        page: 1
      },
      pagination: {
        totalCount: 1,
        pageSize: 10
      },
      items: [
        {value: 'ReceiveTask', name: '驳回任务'},
        {value: 'ReleaseTask', name: '发布任务'}
      ],
      list: []
    }
  },
  computed: {
    taskType() {
      return this.$route.query.taskType || 'ReleaseTask'
    }
  },
  methods: {
    async getList() {
      const {taskType, taskId, page} = this.$route.query
      
      this.form.taskType = taskType || 'ReleaseTask'
      this.form.taskId = taskId || ''
      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      // 请求接口
      const res = await API.mission.taskCheck(params)

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

