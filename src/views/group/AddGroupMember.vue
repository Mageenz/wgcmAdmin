<template lang="pug">
  .page-container
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='姓名' prop='rname')
      el-table-column(label='所属组' prop='groupName')
      el-table-column(label='性别' prop='')
        template(slot-scope='{row}') {{row.rsex === 1 ? '男' : '女'}}
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text' @click='changeGroup(row)') 添加
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pagination: {
        totalCount: 0,
        pageSize: 20,
      },
      page: 1,
      groupId: '',
    }
  },
  methods: {
    handlePageChange(page) {
      this.page = page
      this.addGroupMember(page)
    },
    async changeGroup(row) {
      const res = await API.group.changeGroup({
        groupId: this.groupId,
        userId: row.rid
      })

      if(res.data.code === 100) {
        this.$message.success('操作成功')
      }
    },
    async addGroupMember(page) {
      this.groupId = this.$route.query.groupId

      const res = await API.group.addGroupMember({
        groupId: this.groupId,
        page
      })

      if(res.data.code === 100) {
        this.list = res.data.data.list
        this.pagination.totalCount = res.data.data.total
      }
    }
  },
  mounted() {
    this.addGroupMember(1)
  }
}
</script>