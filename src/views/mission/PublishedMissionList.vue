<template lang="pug">
  .page-container
    el-row(:gutter='20').page-searchbar
      el-col(:span='6')
        el-select(placeholder='请选择' v-model='form.name' clearable).w100
          el-option(:value='key' :label='item' v-for='(item, key) in missionStatus')
      el-col(:span='6')
        el-input(placeholder='请输入关键词' v-model='form.name1' clearable).w100
      el-col(:span='6' style='text-align:left')
        el-button(type='primary' icon='el-icon-search' @click='search') 搜索
    el-table(:data='[{}]' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='任务编号')
        template(slot-scope='{row}')
          router-link(:to='{name: "onlineMission"}') 1234
      el-table-column(label='平台' prop='')
      el-table-column(label='方向' prop='')
      el-table-column(label='数量' prop='')
        template(slot-scope='{row}')
          router-link(:to='{name: "acceptMissionList"}') 0/13
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='form.currentPage' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
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
        name: '',
        name1: '',
        currentPage: 1
      },
      pagination: {
        totalCount: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    getList() {
      const {name, name1, currentPage} = this.$route.query

      this.form.name = name || ''
      this.form.name1 = name1 || ''
      this.form.currentPage = +currentPage || 1
      
      const params = {...this.form, pageSize: this.pagination.pageSize}

      // 请求接口
      console.log('params', params)
    },
    search() {
      this.appendSearchParamsToRoute({...this.form})
      this.getList()
    }
  }
}
</script>

