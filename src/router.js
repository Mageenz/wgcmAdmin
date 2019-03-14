import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/common/Login.vue'
import Home from '@/views/common/Home.vue'
import PublishedMissionList from '@/views/mission/PublishedMissionList'
import OnlineMission from '@/views/mission/OnlineMission'
import MissionCheckList from '@/views/mission/MissionCheckList'
import AcceptMissionList from '@/views/mission/AcceptMissionList'
import PublishMission from '@/views/mission/PublishMission'
import CategoryList from '@/views/mission/CategoryList'
import UserManage from '@/views/user/UserManage'
import AdminUserManage from '@/views/user/AdminUserManage'
import GroupList from '@/views/group/GroupList'
import MissionBillList from '@/views/finance/MissionBillList'
import UserBillList from '@/views/finance/UserBillList'
import NoticeList from '@/views/notice/NoticeList'

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {name: 'home', path: '/', component: Home, redirect: {name: 'publishedMissionList'}, children: [
      {name: 'publishedMissionList', path: '/mission/publishedMissionList', component: PublishedMissionList, meta: {breads: ['已发布任务']}},
      {name: 'onlineMission', path: '/mission/publishedMissionList/onlineMission', component: OnlineMission, meta: {breads: ['已发布任务', '线上任务']}},
      {name: 'acceptMissionList', path: '/mission/publishedMissionList/acceptMissionList', component: AcceptMissionList, meta: {breads: ['已发布任务', '接单任务浏览']}},
      {name: 'missionCheckList', path: '/mission/missionCheckList', component: MissionCheckList, meta: {breads: ['任务审核']}},
      {name: 'publishMission', path: '/mission/publishMission', component: PublishMission, meta: {breads: ['发布任务']}},
      {name: 'categoryList', path: '/mission/categoryList', component: CategoryList, meta: {breads: ['平台及任务类型管理']}},
      {name: 'userManage', path: '/user/userManage', component: UserManage, meta: {breads: ['用户管理']}},
      {name: 'adminUserManage', path: '/user/adminUserManage', component: AdminUserManage, meta: {breads: ['后台用户管理']}},
      {name: 'groupList', path: '/group/groupList', component: GroupList, meta: {breads: ['小组管理']}},
      {name: 'missionBillList', path: '/finance/missionBillList', component: MissionBillList, meta: {breads: ['财务管理', '任务账单']}},
      {name: 'userBillList', path: '/finance/userBillList', component: UserBillList, meta: {breads: ['财务管理', '用户账单']}},
      {name: 'noticeList', path: '/notice/noticeList', component: NoticeList, meta: {breads: ['公告管理']}},
    ]}
  ]
})
