import axios from 'axios'
import router from './router'
import store from './store'
import { Message } from 'element-ui';

window.ENV = process.env.NODE_ENV === 'production' ? '' : '/dev'

let requestWithLoading = axios.create({
  headers: {
    'content-type': 'multipart/form-data'
  },
  timeout: 5000,
  baseURL: ENV
})
let requestWithoutLoading = axios.create({
  headers: {
    'content-type': 'multipart/form-data'
  },
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/dev'
})
requestWithLoading.interceptors.request.use(function (config) {
  let formData = new FormData()
  for(let key in config.data) {
    if(config.data.hasOwnProperty(key) && config.data[key] !== undefined) {
      formData.append(key, config.data[key])
    }
  }
  config.data = formData
  store.commit('updateLoadingStatus', true)
  return config;
}, function (error) {
  return Promise.reject(error);
});
requestWithLoading.interceptors.response.use(function (response) {
  if(response.data.code === 401) {
    router.replace({
      name: 'login'
    })
  }
  store.commit('updateLoadingStatus', false)
  return response;
}, function (error) {
  let data = error.request.response
  let status = error.request.status

  store.commit('updateLoadingStatus', false)
  Message.error({
    message: data.message || '系统繁忙'
  })
  return Promise.reject(error);
});
requestWithoutLoading.interceptors.request.use(function (config) {
  let formData = new FormData()
  for(let key in config.data) {
    if(config.data.hasOwnProperty(key) && config.data[key] !== undefined) {
      formData.append(key, config.data[key])
    }
  }
  config.data = formData

  return config;
}, function (error) {
  return Promise.reject(error);
});
requestWithoutLoading.interceptors.response.use(function (response) {
  if(response.data.code === 401) {
    router.replace({
      name: 'login'
    })
  }
  return response;
}, function (error) {
  const data = JSON.parse(error.request.response)
  const status = error.request.status

  if (status === 401) {
    router.replace({
      name: 'login'
    })
  }
  return Promise.reject(error);
});

window.API = {
  common: {
    login: data => requestWithoutLoading.post('/Admin/doLogin', data)
  },
  platform: {
    searchAll: data => requestWithoutLoading.post('/Platform/searchAll', data),
  },
  mission: {
    taskView: data => requestWithLoading.post('/AllTask/taskView', data),
    taskDetail: data => requestWithLoading.post('/AllTask/taskDetail', data),
    addQuantity: data => requestWithLoading.post('/Task/addQuantity', data),
    updateReleaseStatus: data => requestWithLoading.post('/AllTask/updateReleaseStatus', data),
    receiveTaskView: data => requestWithLoading.post('/AllTask/receiveTaskView', data),
    taskCheck: data => requestWithLoading.post('/AllTask/taskCheck', data),
    checkReleaseTask: data => requestWithLoading.post('/AllTask/checkReleaseTask', data),
    updateReceiveStatus: data => requestWithLoading.post('/AllTask/updateReceiveStatus', data),
    getTaskType: data => requestWithoutLoading.post('/Task/getTaskType', data),
    getTaskTypeDetail: data => requestWithoutLoading.post('/Task/getTaskTypeDetail', data),
    doPublish: data => requestWithLoading.post('/Task/doPublish', data),
    getPlatformList: data => requestWithLoading.post('/Platform/searchAll', data),
    addPlatform: data => requestWithoutLoading.post('/Platform/add', data),
    delPlatform: data => requestWithoutLoading.post('/Platform/del', data),
    editPlatform: data => requestWithoutLoading.post('/Platform/changeName', data),
    getPCList: data => requestWithLoading.post('/TaskType/searchAll', data),
    addPC: data => requestWithoutLoading.post('/TaskType/add', data),
    delPC: data => requestWithoutLoading.post('/TaskType/del', data),
    getAllSecondTaskType: data => requestWithLoading.post('/TaskType/getAllSecondTaskType', data),
    addSecondTaskType: data => requestWithLoading.post('/TaskType/addSecondTaskType', data),
    delSecondTaskType: data => requestWithLoading.post('/TaskType/delSecondTaskType', data),
    foundation: data => requestWithLoading.post('/Task/foundation', data),
  },
  group: {
    groupManagement: data => requestWithLoading.post('/Group/groupManagement', data),
    deleteGroup: data => requestWithLoading.post('/Group/deleteGroup', data),
    buildGroup: data => requestWithLoading.post('/Group/buildGroup', data),
    changeGroupName: data => requestWithLoading.post('/Group/changeGroupName', data),
    groupDetail: data => requestWithLoading.post('/Group/groupDetail', data),
    addGroupMember: data => requestWithLoading.post('/Group/addGroupMember', data),
    changeGroup: data => requestWithLoading.post('/Group/changeGroup', data),
  },
  bill: {
    getBillByDate: data => requestWithLoading.post('/Bill/getBillByDate', data),
    getBillByDateRange: data => requestWithLoading.post('/Bill/getBillByDateRange', data),
    changeBillStatus: data => requestWithLoading.post('/Bill/changeBillStatus', data),
    getFinancialBillByDate: data => requestWithLoading.post('/Bill/getFinancialBillByDate', data),
    getFinancialBillByDateRange: data => requestWithLoading.post('/Bill/getFinancialBillByDateRange', data),
    updateRemark: data => requestWithLoading.post('/Bill/updateRemark', data),
  },
  user: {
    getUserList: data => requestWithLoading.post('/User/getUserList', data),
    userDetail: data => requestWithLoading.post('/User/userDetail', data),
    adminManagement: data => requestWithLoading.post('/Admin/adminManagement', data),
    deleteAdmin: data => requestWithLoading.post('/Admin/deleteAdmin', data),
    addAdmin: data => requestWithLoading.post('/Admin/addAdmin', data),
  },
  notice: {
    searchAll: data => requestWithLoading.post('/Notice/searchAll', data),
    add: data => requestWithLoading.post('/Notice/add', data),
  }
}
