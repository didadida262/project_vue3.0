import { createStore } from 'vuex'
import { UserProps } from '../dataFormat/dataFormat'

const store = createStore({
  state: {
    user: {
      id: 0,
      userName: '',
      isLogin: false,
      userPd: ''
    } as UserProps,
    loading: false
  },
  mutations: {
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
  }
})

export default store
