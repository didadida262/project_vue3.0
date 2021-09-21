import { createStore } from 'vuex'
// import { createStore } from '@/vuex/index'
import { UserProps } from '../dataFormat/dataFormat'

const store = createStore({
  state: {
    age: 1,
    user: {
      id: 0,
      userName: '',
      isLogin: false,
      userPd: ''
    } as UserProps,
    loading: false
  },
  mutations: {
    addAge (state, data) {
      state.age = data
    },

    login (state, userInfo) {
      state.user.userName = userInfo.userName
      state.user.isLogin = true
    },
    loginOut (state) {
      state.user = {
        ...state.user,
        isLogin: false,
        userName: ''
      }
    },
    handelLoading (state, flag: boolean) {
      state.loading = flag
    }
  },
  actions: {
    asaddAge ({ commit }, data) {
      setTimeout(() => {
        commit('addAge', data)
      }, 2000)
    }
  }
})

export default store
