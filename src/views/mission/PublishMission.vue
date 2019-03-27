<template lang='pug'>
  .page-container
    .page-top-tip 朋友圈直发订单：产品单价为 {{form.unitPrice}} 元/个，最低消费数量为 1 个。
    el-form(label-width='120px' label-position='right' :model='form' :rules='rules' ref='form')
      el-form-item(label='平台：' prop='')
        el-select(placeholder='请选择' v-model='form.platform' @change='getParentCategoryList').w300
          el-option(:value='item.pid' :label='item.pname' v-for='(item, key) of platformList')
      el-form-item(label='一级类型：' prop='')
        el-select(placeholder='请选择' v-model='form.taskType' @change='getChildCategoryList').w300
          el-option(:value='item.tid' :label='item.tname' v-for='(item, key) of parentCategoryList')
      el-form-item(label='二级类型：' prop='')
        el-select(placeholder='请选择' v-model='form.taskTypeDetail').w300
          el-option(:value='item.did' :label='item.dname' v-for='(item, key) of childCategoryList')
      el-form-item(label='方向选择：' prop='')
        el-select(placeholder='请选择' v-model='form.direction').w300
          el-option(value='0' label='真人自由发挥')
          el-option(value='1' label='指定方向')
          el-option(value='2' label='指定文案')
      template(v-if='form.direction === "1"')
        el-form-item(label='方向：' prop='')
          el-input(placeholder='请输入方向' v-model='form.direction1' type='textarea' clearable).w600
        el-form-item(label='方向图片：' prop='')
          paste-upload(@success='handlePasteUploadSuccess' ref='dPasteUploader')
        el-form-item(label='方向图片：' prop='')
          el-upload(:action='action' name='files' :file-list='fileList' list-type='picture-card' :on-success='handleUploadSuccessForDirection' :on-remove="handleRemoveForDirection")
            <i class="el-icon-plus"></i>
            .upload-tip(slot='tip') 只能上传gif/jpg/jpeg/png文件
      template(v-if='form.direction === "2"')
        el-form-item(label='文案内容：' prop='')
          el-input(placeholder='请输入文案内容，多条文案请用 回车换行' v-model='form.words' clearable type='textarea' rows='6').w600
          .page-tip 已输入{{form.content.length}}条文案
        el-form-item(label='文案图片：' prop='')
          paste-upload(@success='handlePasteUploadSuccess' ref='cPasteUploader')
        el-form-item(label='文案图片：' prop='')
          el-upload(:action='action' name='files' :file-list='fileList' list-type='picture-card' :on-success='handleUploadSuccessForContent' :on-remove="handleRemoveForContent")
            <i class="el-icon-plus"></i>
            .upload-tip(slot='tip') 手动上传，只能上传gif/jpg/jpeg/png文件
      el-form-item(label='链接和数量：')
        el-input(placeholder='请输入链接和数量，用|分隔，如http://www.xxx.com|100，多条数据用 回车换行' rows='6' type='textarea' v-model='form.BatchList1' clearable).w600
      //- el-form-item(label='数量：' prop='count')
        el-input(placeholder='请输入数量' v-model='form.count' clearable).w300
      el-form-item(label='备注：')
        el-input(placeholder='请输入备注' type='textarea' v-model='form.remark' clearable).w600
      el-form-item(label='' prop='')
        el-checkbox(label='1' v-model='form.fixedRemark' true-label='1' false-label='0') 【记得互相点赞好评！优先点赞带图评论！】
      el-form-item(label='' prop='')
        el-button(type='primary' @click='submit' :loading='isSubmitting') 发布任务
        //- el-button 取消
</template>
<script>
import PasteUpload from '@/components/PasteUpload'

export default {
  data() {
    return {
      isSubmitting: false,
      form: {
        unitPrice: 0,
        platform: '',
        taskType: '',
        taskTypeDetail: '',
        direction: '0',
        direction1: '',
        words: '',
        link: '',
        count: '',
        remark: '',
        fixedRemark: '0',
        contentMedia: [],
        content: [],
        directionMedia: [],
        BatchList1: '',
        BatchList: [],
      },
      rules: {
        link: [
          {required: true, message: '请输入链接'}
        ],
        count: [
          {required: true, message: '请输入数量'}
        ],
        remark: [
          {required: true, message: '请输入备注'}
        ]
      },
      action: `${ENV}/Task/uploadMedia`,
      fileList: [],
      platformList: [],
      parentCategoryList: [],
      childCategoryList: [],
      direction: {
        0: '真人自由发挥',
        1: '指定方向',
        2: '指定文案'
      },
      pasteList: []
    }
  },
  methods: {
    handlePasteUploadSuccess(res) {
      this.pasteList.push(res.data)
    },
    async submit() {
      this.$refs.form.validate(async valid => {
        if(valid) {
          let data = JSON.parse(JSON.stringify(this.form))

          if(data.direction === '1') {
            const pasteFileList = this.$refs.dPasteUploader.getFileList()
            data.directionMedia = data.contentMedia.concat(pasteFileList)
          }

          if(data.direction === '2') {
            const pasteFileList = this.$refs.cPasteUploader.getFileList()
            data.contentMedia = data.contentMedia.concat(pasteFileList)

            // if(data.content.length !== data.contentMedia.length) {
            //   this.$message.warning('文案数量必须与图片数量相等')
            //   return
            // }
          }

          this.isSubmitting = true

          data.contentMedia = JSON.stringify(data.contentMedia)
          data.content = JSON.stringify(data.content)
          data.directionMedia = JSON.stringify(data.directionMedia)
          data.BatchList = JSON.stringify(data.BatchList)
          
          if(data.direction === '1') {
            data.direction = data.direction1
          } else {
            data.direction = this.direction[data.direction]
          }

          delete data.words
          delete data.direction1
          delete data.BatchList1

          const res = await API.mission.doPublish(data)

          this.isSubmitting = false

          if(res.data.code === 100) {
            this.$message.success('提交成功')
            this.$router.go(-1)
          }
        }
      })
      
    },
    handleUploadSuccessForDirection(res, file, fileList) {
      this.form.directionMedia.push(res.data)
    },
    handleUploadSuccessForContent(res, file, fileList) {
      console.log('success', res, file, fileList)
      this.form.contentMedia.push(res.data)
      this.fileList = fileList
    },
    // handlePictureCardPreview() {},
    handleRemoveForDirection(file, fileList) {
      this.form.directionMedia.splice(this.form.directionMedia.indexOf(file.response.data), 1)
    },
    handleRemoveForContent(file, fileList) {
      console.log('remove', file, fileList)
      this.form.contentMedia.splice(this.form.contentMedia.indexOf(file.response.data), 1)
    },
    async getPlatformList() {
      const res = await API.platform.searchAll()
      
      if(res.data.code === 100) {
        this.platformList = res.data.data
        this.form.platform = res.data.data[0].pid

        this.getParentCategoryList(this.form.platform)
      }
    },
    async getParentCategoryList(platform) {
      const res = await API.mission.getTaskType({platform})

      if(res.data.code === 100) {
        this.parentCategoryList = res.data.data
        this.form.taskType = this.parentCategoryList[0].tid
        this.getChildCategoryList(this.form.taskType)
      }
    },
    async getChildCategoryList(fatherTaskType) {
      const res = await API.mission.getTaskTypeDetail({fatherTaskType})

      if(res.data.code === 100) {
        this.childCategoryList = res.data.data
        this.form.taskTypeDetail = this.childCategoryList[0].did
      }
    }
  },
  watch: {
    'form.BatchList1'(val) {
      if(val !== '') {
        this.form.BatchList = val.split('\n')
      } else {
        this.form.BatchList = []
      }
    },
    'form.words'(val) {
      if(val !== '') {
        this.form.content = val.split('\n')
      } else {
        this.form.content = []
      }
    },
    'form.taskTypeDetail'(val) {
      this.parentCategoryList.forEach(parent => {
        if(parent.tid === this.form.taskType) {
          if(parent.tunit === 0) {
            this.childCategoryList.forEach(child => {
              if(child.did === val) {
                this.form.unitPrice = child.unitPrice
              }
            })
          } else {
            this.form.unitPrice = parent.tunit
          }
        }
      })
    }
  },
  components: {
    PasteUpload
  },
  mounted() {
    this.getPlatformList()
  }
}
</script>
<style lang='less' scoped>

</style>