<template lang="pug">
  .main-container(id='app')
    .leftbar
      .logo 玩固传媒
      .welcome
        img(src='./assets/logo.png' width='50')
        .userinfo
          .username magee
          .tip 欢迎回来
      ul.navs
        li.nav(v-for='(parent, index) in navs' :class='{active: activeIndex === index}')
          a.parent-nav(@click='openChildNavs(index)' href='javascripe:void(0)')
            i(:class='parent.icon').icon
            span {{parent.name}}
            i.el-icon-arrow-left(:class='{active: activeIndex === index}')
          ul.child-navs(:style='{height: activeIndex === index ? `${parent.children.length * 37}px` : 0}')
            li(v-for='child in parent.children')
              router-link(:to='child.path').child-nav
                //- i.el-icon-tickets
                span {{child.name}}
    .right-content
      .topbar
        el-button(type='danger').loginout 退出
      .page-content
        .page-breads
          el-breadcrumb(separator='/')
            el-breadcrumb-item(v-for='item in $route.meta.breads') {{item}}
        router-view.router
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
            {name: '用户管理', path: '/user/publishedMissionLisa2'},
          ]
        },
        {
          name: '小组管理',
          icon: 'el-icon-menu',
          children: [
            {name: '小组管理', path: '/group/publishedMissionLisa2'},
          ]
        },
        {
          name: '财务管理',
          icon: 'el-icon-goods',
          children: [
            {name: '任务账单', path: '/finance/publishedMissionLisa2'},
            {name: '用户管理', path: '/finance/publishedMissionLisb3'},
          ]
        },
        {
          name: '公告管理',
          icon: 'el-icon-message',
          children: [
            {name: '公告管理', path: '/xxx'}
          ]
        }
      ]
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
      margin-bottom: 10px;
  }
  .page-top-tip {
    margin-bottom: 15px;
  }
  .page-searchbar,.page-table,.page-table-info {
    margin-bottom: 15px;
  }
  .el-form-item__label,.el-form-item__content,.el-checkbox__label {
    font-size: 12px;
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
.w100 {
  width: 100%;
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
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  font-size: 14px;
}
.logo {
  font-weight: bold;
  font-size: 16px;
  line-height: 45px;
  background-color: #273e51;
  text-align: center;
}
.welcome {
  overflow: hidden;
  padding: 20px;
  border-bottom: 2px #293e50 solid;
  img {
    float: left;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 5px solid #2c3e50;
    margin-right: 20px;
  }
  .userinfo {
    margin-left: 70px;
    text-align: left;
    font-weight: bold;
    .username {
      margin-bottom: 5px;
    }
    .tip {
      font-size: 12px;
    }
  }
}
.loginout {
  position: absolute;
  right: 10px;
  top: 9px;
}
.navs {
  a {
      color: #fff;
      text-decoration: none;
  }
  text-align: left;
  .nav {
    background-color: #33485e;
    // margin: 2px 0;
    border-bottom: 2px #2a3e50 solid;
    border-left: 4px solid #1973c4;
    .icon {
      margin-right: 10px;
    }
    .el-icon-arrow-left,.el-icon-arrow-down {
      float: right;
      margin-top: 15px;
      margin-right: 15px;
      transition: .2s;
    }
    .el-icon-arrow-left.active {
      transform: rotateZ(-90deg)
    }
    .parent-nav {
      line-height: 45px;
      padding-left: 20px;
      display: block;
      transition: .2s;
    }
    .parent-nav:hover {
      background-color: #2b3e50;
    }
    .child-navs {
      transition: .3s;
      overflow: hidden;
      background-color: #293e50;
    }
    .child-nav {
      line-height: 37px;
      padding-left: 45px;
      display: block;
      // transition: .2s;
      font-size: 12px;
    }
    .child-nav:hover,.router-link-active {
      color: #2a95f5;
    }
  }
  .nav.active {
    background-color: #2a3e50;
  }
}

.leftbar {
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #32475f;
  color: #fff;
}
.right-content {
  margin-left: 230px;
  padding: 60px 20px 0 0;
  .topbar {
    position: fixed;
    top: 0;
    left: 220px;
    height: 50px;
    right: 0;
    background-color: #fff;
  }
  .page-content {
    background-color: #fff;
    border-radius: 5px;
    padding: 15px;
  }
  .page-breads {
    border-bottom: 1px #eee solid;
    padding-bottom: 15px;
    font-weight: bold;
    text-align: left;
    font-size: 14px;
    margin-bottom: 15px;
  }
}
</style>
