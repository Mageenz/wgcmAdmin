import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './api'
import {formatTime} from '@/utils'

Vue.config.productionTip = false
Vue.use(ElementUI, { size: 'small' });
Vue.filter('formatTime', v => {
  return formatTime(v)
})
store.commit('updateUserInfo', JSON.parse(localStorage.userInfo || '{}'))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
