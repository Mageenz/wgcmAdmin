import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false,
    userInfo: null
  },
  mutations: {
    updateLoadingStatus(state, status) {
      state.isLoading = status
    },
    updateUserInfo(state, data) {
      state.userInfo = data
    }
  },
  actions: {

  }
})
