<template lang="pug">
  .page-container
    table.page-table-info.mb30
      tr
        th 编号：
        td {{taskInfo.tid}}
        th 平台：
        td {{taskInfo.platformName}}
      tr
        th 用户：
        td {{taskInfo.userName}}
        th 类型：
        td {{taskInfo.typeName}}
      tr
        th 链接：
        td
          a(:href='taskInfo.tlink' target='_blank') {{taskInfo.tlink}}
        th 数量：
        td
          span.mr15 {{taskInfo.trequiredquan}}/{{taskInfo.tleftquan}}
          el-button(type='primary' @click='isDialogShow = true' v-if='!isReleaseTaskCheck && !isReceiveTaskCheck') 增加数量
      tr
        th 金额：
        td {{taskInfo.tamount}}
        th 状态：
        td {{taskInfo.tstatus}}
      tr
        th 方向：
        td(colspan='3') {{taskInfo.tdirection}}
    el-form(label-width='120px' label-position='right' v-if='isReleaseTaskCheck')
      el-form-item(label='接单次数上限：' prop='')
        el-input(placeholder='请输入' v-model='releaseTaskForm.receiveLimit' clearable).w300
      el-form-item(label='兼职是否可见：' prop='')
        el-radio-group(v-model='releaseTaskForm.visible')
          el-radio(label='0') 不可见
          el-radio(label='1') 可见
      el-form-item(label='超时时间：' prop='')
        el-select(placeholder='请选择' v-model='releaseTaskForm.timeout' clearable)
          el-option(:value='key' :label='item' :key='key' v-for='(item, key) in timeout')
      el-form-item(label='是否通过：' prop='')
        el-radio-group(v-model='releaseTaskForm.taskStatus')
          el-radio(label='1') 通过
          el-radio(label='4') 不通过
      el-form-item(label='不通过原因：' prop='' v-if='isReleaseTaskCheck && releaseTaskForm.taskStatus === "4"')
        el-input(placeholder='请输入不通过原因' v-model='form.cause' clearable type='textarea').w600
    el-form(label-width='120px' label-position='right' v-if='isReceiveTaskCheck')
      el-form-item(label='是否通过：' prop='')
        el-radio-group(v-model='receiveTaskForm.taskStatus')
          el-radio(label='1') 通过
          el-radio(label='4') 不通过
      el-form-item(label='不通过原因：' prop='' v-if='isReceiveTaskCheck && receiveTaskForm.taskStatus === "4"')
        el-input(placeholder='请输入不通过原因' v-model='form.cause' clearable type='textarea').w600
    .page-foot
      el-button(type='primary' @click='check' v-if='isReleaseTaskCheck || isReceiveTaskCheck') 提交
      el-button(type='primary' @click='submit' v-if='isOnline') 完成任务
      el-button(@click='$router.go(-1)') 返回
    el-dialog(width='30%' :visible.sync='isDialogShow' title='增加数量')
      el-form(label-width='100px' label-position='right' ref='dForm' :model='dForm')
        el-form-item 目前数量为{{taskInfo.trequiredquan}}，单价为{{taskInfo.tunitprice}}元
        el-form-item(label='数量：' prop='addQuantity' :rules='{required: true, message: "请输入数量"}' )
          el-input(placeholder='请输入数量' v-model='dForm.addQuantity' clearable)
      .d-foot(slot='footer')
        el-button(type='primary' @click='addQ') 提交 
        el-button(@click='isDialogShow = false') 取消
</template>

<script>
export default {
  data() {
    return {
      form: {},
      releaseTaskForm: {
        taskId: '',
        receiveLimit: '',
        visible: '0',
        timeout: '1',
        cause: '',
        taskStatus: '1',
      },
      receiveTaskForm: {
        taskId: '',
        releaseTaskId: '',
        cause: '',
        taskStatus: '1',
      },
      timeout: {
        1: '半小时',
        2: '一小时',
        3: '三小时',
        4: '一天'
      },
      dForm: {
        addQuantity: ''
      },
      isDialogShow: false,
      info: {
        taskMap: {
          ReleaseTask: {}
        }
      },
      taskInfo: {}
    }
  },
  computed: {
    isOnline() {
      return this.$route.query.operateType === 'online'
    },
    isReleaseTaskCheck() {
      return this.$route.query.operateType === 'releaseTaskCheck'
    },
    isReceiveTaskCheck() {
      return this.$route.query.operateType === 'receiveTaskCheck'
    }
  },
  methods: {
    async check() {
      if(this.isReleaseTaskCheck) {
        const res = await API.mission.checkReleaseTask(this.releaseTaskForm)

        if(res.data.code === 100) {
          this.$message.success('操作成功')
          this.$router.go(-1)
        }
      } else if(isReceiveTaskCheck) {

      }
    },
    async submit() {
      const res = await API.mission.updateReleaseStatus({
        taskId: this.taskInfo.tid,
        taskStatus: 3
      })

      if(res.data.code === 100) {
        this.$message.success('操作成功')
        this.$router.go(-1)
      }
    },
    async addQ() {
      const valid = await this.$refs.dForm.validate()
      if(!valid) {
        return
      }
      const res = await API.mission.addQuantity({
        taskId: this.taskInfo.tid,
        requiredQuantity: this.taskInfo.trequiredquan,
        leftQuantity: this.taskInfo.tleftquan,
        unitPrice: this.taskInfo.tunitprice,
        addQuantity: this.dForm.addQuantity
      })

      if(res.data.code === 100) {
        this.$message.success('添加成功')
        this.isDialogShow = false
        this.getInfo()
      }
    },
    async getInfo() {
      const {taskId, taskType, taskAddUserType, releaseTaskId} = this.$route.query

      this.form = {taskId, taskType, taskAddUserType}
      this.releaseTaskForm.taskId = this.receiveTaskForm.taskId = taskId
      this.releaseTaskForm.releaseTaskId = releaseTaskId
      const res = await API.mission.taskDetail(this.form)
      
      if(res.data.code === 100) {
        this.info = res.data.data
        this.taskInfo = res.data.data.taskMap.ReceiveTask || res.data.data.taskMap.ReleaseTask
      }
    }
  },
  mounted() {
    this.getInfo()
  }
}
</script>

