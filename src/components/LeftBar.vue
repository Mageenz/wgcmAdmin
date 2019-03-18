<template lang="pug">
  .leftbar(:style='{transform: isLeftBarShow ? "translateX(0)" : "translateX(-100%)"}')
    .logo 玩固传媒
    .welcome
      img(:src='`${ENV}${userInfo.admin.aheadphoto}`' width='50')
      .userinfo
        .username {{userInfo.admin.aname}}
        .tip 欢迎回来
    ul.navs
      li.nav(v-for='(parent, index) in navs' :class='{active: activeIndex === index}')
        a.parent-nav(@click='openChildNavs(index)' href='javascript:void(0)')
          i(:class='parent.icon').icon
          span {{parent.name}}
          i.el-icon-arrow-left(:class='{active: activeIndex === index}')
        ul.child-navs(:style='{height: activeIndex === index ? `${parent.children.length * 37}px` : 0}')
          li(v-for='child in parent.children')
            router-link(:to='child.path').child-nav
              //- i.el-icon-tickets
              span {{child.name}}
</template>

<script>
export default {
  data() {
    return {
      ENV,
      activeIndex: 0,
      navs: [
        {
          name: '任务管理',
          icon: 'el-icon-setting',
          children: [
            {name: '已发布任务', path: '/mission/publishedMissionList'},
            {name: '任务审核', path: '/mission/missionCheckList'},
            {name: '发布任务', path: '/mission/publishMission'},
            {name: '平台及任务类型', path: '/mission/platformList'},
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
      ]
    }
  },
  props: ['isLeftBarShow'],
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
    userInfo() {
      return this.$store.state.userInfo
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

<style lang="less" scoped>
.leftbar {
  width: 220px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  background-color: #32475f;
  color: #fff;
  transition: .3s;
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
  .navs {
    a {
      color: #fff;
      text-decoration: none;
    }
    background-color: #2a3e50;
    padding: 2px 0;
    text-align: left;
    .nav {
      background-color: #33485e;
      border-left: 4px solid #1973c4;
      margin-bottom: 2px;
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
    .nav:last-child {
      margin-bottom: 0;
    }
    .nav.active {
      background-color: #2a3e50;
    }
  }
}
</style>
