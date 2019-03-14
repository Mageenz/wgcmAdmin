import axios from 'axios'
import router from './router'
import store from './store'
import { Message } from 'element-ui';

let requestWithLoading = axios.create({
  headers: {
    'content-type': 'multipart/form-data'
  },
  timeout: 5000,
  baseURL: process.env.NODE_ENV === 'production' ? '' : '/dev'
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
    if(config.data.hasOwnProperty(key)) {
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
  store.commit('updateLoadingStatus', false)
  return response;
}, function (error) {
  let data = error.request.response
  let status = error.request.status

  store.commit('updateLoadingStatus', false)
  Message.error({
    message: data.message || '系统繁忙'
  })
  if (status === 401) {
    router.replace({
      name: 'login'
    })
  }
  return Promise.reject(error);
});
requestWithoutLoading.interceptors.request.use(function (config) {
  let formData = new FormData()
  for(let key in config.data) {
    if(config.data.hasOwnProperty(key)) {
      formData.append(key, config.data[key])
    }
  }
  config.data = formData

  return config;
}, function (error) {
  return Promise.reject(error);
});
requestWithoutLoading.interceptors.response.use(function (response) {
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
  mission: {
    taskView: data => requestWithLoading.post('/AllTask/taskView', data),
    taskDetail: data => requestWithLoading.post('/AllTask/taskDetail', data),
  }
}
