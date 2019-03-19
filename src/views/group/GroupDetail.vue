<template lang="pug">
  .page-container
    .page-operatebar
      el-button(type='primary' @click='$router.push({name: "addGroupMember", query: {groupId}})') 添加成员
    el-table(:data='list' border stripe).page-table
      el-table-column(type='index')
      el-table-column(label='姓名' prop='rname')
      el-table-column(label='性别')
        template(slot-scope='{row}') {{row.rsex === 1 ? '男' : '女'}}
      el-table-column(label='操作' prop='')
        template(slot-scope='{row}')
          el-button(type='text' @click='deleteGroup(row)') 删除
    el-pagination.page-pagination(background :total='pagination.totalCount' :page-size='pagination.pageSize' :current-page='page' @current-change='handlePageChange' layout='prev, pager, next, total, jumper')
</template>

<script>
export default {
  data() {
    return {
      list: [],
      isDialogShow: false,
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
    deleteGroup(row) {
      this.$confirm('此操作将删除该成员, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const res = await API.group.deleteGroup({
          groupId: row.gid,
          groupNum: row.gnum
        })

        if(res.data.code === 100) {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.groupManagement()
        }
      })
    },
    async groupManagement(page) {
      this.groupId = this.$route.query.groupId

      const res = await API.group.groupDetail({
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
    this.groupManagement(1)
  }
}
</script>