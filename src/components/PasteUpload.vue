<template lang="pug">
  .paste-wrap
    .paste-upload-wrap(contenteditable='true' @paste='paste($event)' ref='wrap')
    .paste-tip 使用微信、QQ的截图工具进行截图，直接粘贴即可上传图片
</template>

<script>
import {upload} from '@/ajax'

export default {
  data() {
    return {
      fileList: [],
      ENV
    }
  },
  methods: {
    paste(e) {
      e.preventDefault()
      const _self = this
      console.log('e', e, e.clipboardData.files, e.clipboardData.items)
      let files = e.clipboardData.files
      
      if(!files.length) {
        this.$message.warning('粘贴的不是截图，请重新截图')
        return
      }

      upload({
        filename: 'files',
        action: `${ENV}/Task/uploadMedia`,
        file: files[0],
        onSuccess: res => {
          // _self.fileList.push(res.data)
          _self.createImg(res.data)
        }
      })
    },
    createImg(url) {
      let img = document.createElement('img')

      img.className = 'paste-img'
      img.src = `${ENV}${url}`
      img.dataset.src = url

      this.$refs.wrap.appendChild(img)
    },
    getFileList() {
      const imgs = this.$refs.wrap.querySelectorAll('.paste-img')
      let fileList = []

      Array.prototype.forEach.call(imgs, item => {
        fileList.push(item.dataset.src)
      })

      return fileList
    }
  }
}
</script>

<style lang="less">
.paste-upload-wrap {
  min-height: 160px;
  border: 1px #ccc dashed;
  outline: none;
  line-height: 1;
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-wrap: wrap;
  overflow: auto;
  .paste-img {
    margin-right: 10px;
    margin-bottom: 10px;
    height: 146px;
    border:1px #ccc solid;
    border-radius: 5px;
  }
}
.paste-tip {
  color: #ccc;
}
</style>


