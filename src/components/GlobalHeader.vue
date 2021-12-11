<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between px-4">
        <router-link to="/" class="navbar-brand">
          爸爸的地盘
        </router-link>
        <!-- <ul v-if="!user.isLogin">
          <li class="list-inline-item">
            <router-link class="btn btn-outline-light my-2" to="/login">
            登录
            </router-link>
          </li>
          <li class="list-inline-item"><a href="#" class="btn btn-outline-light my-2">注册</a></li>
        </ul> -->
        <drop-down :title="`Hello,${JSON.parse(user).userName}`">
          <drop-item><a href="#" class="dropdown-item">新建文章</a></drop-item>
          <drop-item disabled><a href="#" class="dropdown-item">编辑资料</a></drop-item>
          <drop-item><a href="#" class="dropdown-item" @click="quit">退出登录</a></drop-item>
        </drop-down>
    </nav>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue'
import DropDown from './DropDown.vue'
import DropItem from './DropItem.vue'
import { UserProps } from '../dataFormat/dataFormat'
import { useStore } from 'vuex'
import router from '../router/router'

export default defineComponent({
  components: {
    DropDown,
    DropItem
  },
  name: 'GlobalHeader',
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup (props) {
    console.log('globak-------->:', props.user)
    const store = useStore()
    // const name = props.user.userName
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { user } = props
    console.log('user:', user)
    const quit = () => {
      store.commit('loginOut')
      localStorage.userInfo = JSON.stringify({})
      router.push('/login')
    }

    return {
      quit,
      store
    }
  }
})
</script>

<style>

</style>
