import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/common/Login.vue'
import Home from '@/views/common/Home.vue'
import PublishedMissionList from '@/views/mission/PublishedMissionList'
import MissionDetail from '@/views/mission/MissionDetail'
import MissionCheckList from '@/views/mission/MissionCheckList'
import AcceptMissionList from '@/views/mission/AcceptMissionList'
import PublishMission from '@/views/mission/PublishMission'
import PlatformList from '@/views/mission/PlatformList'
import CategoryList from '@/views/mission/CategoryList'
import ChildCategoryList from '@/views/mission/ChildCategoryList'
import CUserManage from '@/views/user/CUserManage'
import RUserManage from '@/views/user/RUserManage'
import UserDetail from '@/views/user/UserDetail'
import AdminUserManage from '@/views/user/AdminUserManage'
import GroupList from '@/views/group/GroupList'
import GroupDetail from '@/views/group/GroupDetail'
import AddGroupMember from '@/views/group/AddGroupMember'
import MissionBillList from '@/views/finance/MissionBillList'
import UserBillList from '@/views/finance/UserBillList'
import NoticeList from '@/views/notice/NoticeList'

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'login', path: '/login', component: Login},
    {name: 'home', path: '/', component: Home, redirect: {name: 'publishedMissionList'}, children: [
      {name: 'publishedMissionList', path: '/mission/publishedMissionList', component: PublishedMissionList, meta: {breads: ['已发布任务']}},
      {name: 'onlineMission', path: '/mission/publishedMissionList/onlineMission', component: MissionDetail, meta: {breads: ['已发布任务', '线上任务']}},
      {name: 'acceptMissionList', path: '/mission/publishedMissionList/acceptMissionList', component: AcceptMissionList, meta: {breads: ['已发布任务', '接单任务浏览']}},
      {name: 'missionCheckList', path: '/mission/missionCheckList', component: MissionCheckList, meta: {breads: ['任务审核']}},
      {name: 'publishMission', path: '/mission/publishMission', component: PublishMission, meta: {breads: ['发布任务']}},
      {name: 'platformList', path: '/mission/platformList', component: PlatformList, meta: {breads: ['平台及任务类型管理']}},
      {name: 'categoryList', path: '/mission/platformList/categoryList', component: CategoryList, meta: {breads: ['平台及任务类型管理', '一级类型']}},
      {name: 'childCategoryList', path: '/mission/platformList/childCategoryList', component: ChildCategoryList, meta: {breads: ['平台及任务类型管理', '一级类型', '二级类型']}},
      {name: 'rUserManage', path: '/user/rUserManage', component: RUserManage, meta: {breads: ['用户管理', '兼职管理']}},
      {name: 'cUserManage', path: '/user/cUserManage', component: CUserManage, meta: {breads: ['用户管理', '客户管理']}},
      {name: 'userDetail', path: '/user/userDetail', component: UserDetail, meta: {breads: ['用户管理', '用户详情']}},
      {name: 'adminUserManage', path: '/user/adminUserManage', component: AdminUserManage, meta: {breads: ['后台用户管理']}},
      {name: 'groupList', path: '/group/groupList', component: GroupList, meta: {breads: ['小组管理']}},
      {name: 'groupDetail', path: '/group/groupList/groupDetail', component: GroupDetail, meta: {breads: ['小组管理', '小组详情']}},
      {name: 'addGroupMember', path: '/group/groupList/addGroupMember', component: AddGroupMember, meta: {breads: ['小组管理', '小组详情', '添加成员']}},
      {name: 'missionBillList', path: '/finance/missionBillList', component: MissionBillList, meta: {breads: ['财务管理', '任务账单']}},
      {name: 'userBillList', path: '/finance/userBillList', component: UserBillList, meta: {breads: ['财务管理', '用户账单']}},
      {name: 'noticeList', path: '/notice/noticeList', component: NoticeList, meta: {breads: ['公告管理']}},
      {name: 'missionCheck', path: '/mission/missionCheckList/missionCheck', component: MissionDetail, meta: {breads: ['任务审核', '任务详情']}},
    ]}
  ]
})
