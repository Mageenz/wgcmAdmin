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
      el-table-column(label='接单编号' prop='tid')
      el-table-column(label='发布编号' prop='ttid')
      el-table-column(label='兼职编号' prop='trid')
      el-table-column(label='用户名' prop='userName')
      el-table-column(label='反馈截图' prop='')
        template(slot-scope='{row}')
          img(:src='item' width='80' v-for='item in row.screenShotList' @click='viewPhoto(row)')
      el-table-column(label='原因' prop='trefuseCause')
      el-table-column(label='时间' prop='tdate' :formatter='timeFormater')
      el-table-column(label='任务状态' prop='')
        template(slot-scope='{row}') {{missionStatus1[row.tstatus]}}
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text' @click='updateReceiveStatus(row, 2)' v-if='row.tstatus === 1 || row.tstatus === 4') 通过
          el-button(type='text' @click='updateReceiveStatus(row, 3)' v-if='row.tstatus === 1 || row.tstatus === 4') 不通过
          el-button(type='text' @click='updateReceiveStatus(row, 4)' v-if='row.tstatus === 1') 驳回
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
    el-dialog(:visible.sync='isDialogShow1' title='查看截图' width='70%' top='30px')
      .flex
        .flex-1
          img(:src='item' v-for='item in dForm1.screenShotList' width='100%')
        .flex-1
          el-form(label-width='60px' label-position='right' :model='dForm1' ref='dForm1')
            el-form-item(label='状态：' prop='')
              el-radio-group(v-model='dForm1.taskStatus')
                el-radio(:label='2') 通过
                el-radio(:label='3') 不通过
                el-radio(:label='4') 驳回
            el-form-item(label='理由：' prop='cause' :rules='{required: dForm1.taskStatus !== 2, message: "请输入理由"}')
              el-input(placeholder='请输入理由' v-model='dForm1.cause' type='textarea' clearable)
            el-form-item(label='' prop='')
              el-button(type='primary' @click='doUpdateReceiveStatus1') 提交
              el-button(@click='isDialogShow1 = false') 关闭
    el-dialog(:visible.sync='isDialogShow' title='审核任务' width='30%')
      el-form(label-width='60px' label-position='right')
        el-form-item(label='原因：' prop='')
          el-input(placeholder='请输入原因' type='textarea' rows='6' v-model='dForm.cause' clearable).w300
      .p-foot(slot='footer')
        el-button(type='primary' @click='doUpdateReceiveStatus') 提交
        el-button(@click='isDialogShow = false') 取消
</template>

<script>
import mixin from '@/mixin'
import {missionStatus1} from '@/enums'
import {formatTime} from '@/utils'

export default {
  mixins: [mixin],
  data() {
    return {
      ENV,
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
      list: [],
      isDialogShow: false,
      isDialogShow1: false,
      dForm: {
        cause: '',
        taskId: '',
        taskStatus: ''
      },
      dForm1: {
        screenShotList: [],
        taskStatus: 2,
        cause: '',
        releaseTaskId: '',
        taskId: ''
      },
    }
  },
  methods: {
    doUpdateReceiveStatus1() {
      this.$refs.dForm1.validate(async valid => {
        if(valid) {
          const res = await API.mission.updateReceiveStatus(this.dForm1)

          if(res.data.code === 100) {
            this.$message.success('操作成功')
            this.getList()
          }
        }
      })
    },
    viewPhoto(row) {
      this.isDialogShow1 = true
      this.dForm1.screenShotList = row.screenShotList
      this.dForm1.taskId = row.tid
    },
    updateReceiveStatus(row, taskStatus) {
      if(taskStatus === 2) {
        this.doUpdateReceiveStatus(row, taskStatus)
      } else {
        this.isDialogShow = true
        this.dForm.cause = ''
        this.dForm.taskId = row.tid
        this.dForm.taskStatus = taskStatus
      }
    },
    async doUpdateReceiveStatus() {
      const res= await API.mission.updateReceiveStatus(this.dForm)

      if(res.data.code === 100) {
        this.$message.success('操作成功')
        this.isDialogShow = false
        this.getList()
      }
    },
    timeFormater(r, c, v, i) {
      return formatTime(v)
    },
    async getList() {
      const {releaseTaskId, taskStatus, taskId, page} = this.$route.query

      this.dForm.releaseTaskId = this.dForm1.releaseTaskId = this.form.releaseTaskId = releaseTaskId
      this.form.taskStatus = taskStatus || '0'
      this.form.taskId = taskId || ''
      this.form.page = +page || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      const res = await API.mission.receiveTaskView(params)

      if(res.data.code === 100) {
        this.list = res.data.data.receiveTask.list
        this.pagination.totalCount = res.data.data.receiveTask.total
      }
    },
    search() {
      this.appendSearchParamsToRoute({...this.form})
      this.getList()
    }
  }
}
</script>
