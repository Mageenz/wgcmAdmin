<template lang="pug">
  .main-container(id='app')
    router-view
</template>

<script>
export default {
  data() {
    return {
      activeIndex: 0,
      navs: [
        {
          name: '任务管理',
          icon: 'el-icon-setting',
          children: [
            {name: '已发布任务', path: '/mission/publishedMissionList'},
            {name: '任务审核', path: '/mission/missionCheckList'},
            {name: '发布任务', path: '/mission/publishMission'},
            {name: '平台及任务类型', path: '/mission/categoryList'},
          ]
        },
        {
          name: '用户管理',
          icon: 'el-icon-document',
          children: [
            {name: '用户管理', path: '/user/userManage'},
            {name: '后台用户管理', path: '/user/adminUserManage'},
          ]
        },
        {
          name: '小组管理',
          icon: 'el-icon-menu',
          children: [
            {name: '小组管理', path: '/group/groupList'},
          ]
        },
        {
          name: '财务管理',
          icon: 'el-icon-goods',
          children: [
            {name: '任务账单', path: '/finance/missionBillList'},
            {name: '用户管理', path: '/finance/userBillList'},
          ]
        },
        {
          name: '公告管理',
          icon: 'el-icon-message',
          children: [
            {name: '公告管理', path: '/notice/noticeList'}
          ]
        }
      ],
      isLeftBarShow: true
    }
  },
  watch: {
    $route(val) {
      this.navs.forEach((item, index) => {
        item.children.forEach(child => {
          if(val.fullPath.indexOf(child.path) > -1) {
            this.activeIndex = index
            return
          }
        })
      })
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading
    }
  },
  methods: {
    openChildNavs(index) {
      if(this.activeIndex === index) {
        this.activeIndex = -1
      } else {
        this.activeIndex = index
      }
    }
  },
  mounted() {
    this.navs.forEach((item, index) => {
      item.children.forEach(child => {
        if(this.$route.fullPath.indexOf(child.path) > -1) {
          this.activeIndex = index
          return
        }
      })
    })
  }
}
</script>


<style lang="less">
.page-container {
  font-size: 12px;
  .page-operatebar {
      background-color: #eee;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 15px;
  }
  
  .page-top-tip {
    margin-bottom: 15px;
  }
  .page-searchbar,.page-table,.page-table-info {
    margin-bottom: 15px;
  }
  .el-form-item__label,.el-form-item__content,.el-checkbox__label,.el-radio__label {
    font-size: 12px;
  }
  .el-radio__inner {
    width: 12px;
    height: 12px;
  }
  .page-table-info {
    width: 100%;
    font-size: 12px;
    border-collapse: collapse;
    th,td {
      padding: 8px 10px;
      line-height: 23px;
      border: 1px solid #ebeef5;
    }
    th {
      background: #f8fbfd;
      text-align: left;
      color: #909399;
      font-weight: 700;
      width: 16%;
    }
    td {
      white-space: normal;
      word-break: break-all;
      color: #606266;
      width: 34%;
    } 
  }
  .page-foot,.page-pagination {
    text-align: center;
  }
}
.upload-tip {
  color: #ccc;
}
.w100 {
  width: 100% !important;
}
.w300 {
  width: 300px !important;
}
.w600 {
  width: 600px !important;
}
.mr15 {
  margin-right: 15px;
}
.mb30 {
  margin-bottom: 30px !important;
}
body {
  background-color: #eee;
}
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: #399bff;
}
body {
  min-width: 1000px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
</style>
