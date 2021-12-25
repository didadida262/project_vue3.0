import { createStore } from 'vuex'
// import { createStore } from '@/vuex/index'
import { UserProps } from '../dataFormat/dataFormat'

const store = createStore({
  state: {
    age: 1,
    user: {
      userName: '',
      userPd: ''
    } as UserProps,
    loading: false
  },
  mutations: {
    testMut (state) {
      state.age++
    },
    addAge (state, data) {
      state.age = data
    },

    login (state, userInfo) {
      state.user = {
        ...state.user,
        ...userInfo
      }
    },
    loginOut (state) {
      state.user = {
        ...state.user,
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
  },
  getters: {
    getUser: (state) => {
      return `geter-->${state.user}`
    }
  }
})

export default store
