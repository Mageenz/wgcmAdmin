import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import PublishedMissionList from '@/views/mission/PublishedMissionList'
import OnlineMission from '@/views/mission/OnlineMission'
import MissionCheckList from '@/views/mission/MissionCheckList'
import AcceptMissionList from '@/views/mission/AcceptMissionList'
import PublishMission from '@/views/mission/PublishMission'
import CategoryList from '@/views/mission/CategoryList'

Vue.use(Router)

export default new Router({
  routes: [
    {name: 'home', path: '/', component: Home},
    {name: 'publishedMissionList', path: '/mission/publishedMissionList', component: PublishedMissionList, meta: {breads: ['已发布任务']}},
    {name: 'onlineMission', path: '/mission/publishedMissionList/onlineMission', component: OnlineMission, meta: {breads: ['已发布任务', '线上任务']}},
    {name: 'acceptMissionList', path: '/mission/publishedMissionList/acceptMissionList', component: AcceptMissionList, meta: {breads: ['已发布任务', '接单任务浏览']}},
    {name: 'missionCheckList', path: '/mission/missionCheckList', component: MissionCheckList, meta: {breads: ['任务审核']}},
    {name: 'publishMission', path: '/mission/publishMission', component: PublishMission, meta: {breads: ['发布任务']}},
    {name: 'categoryList', path: '/mission/categoryList', component: CategoryList, meta: {breads: ['平台及任务类型管理']}},
  ]
})
