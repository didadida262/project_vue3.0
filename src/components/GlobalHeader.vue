<template>
    <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
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
        <drop-down :title="`Hello,${name}`">
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
    const handleHeight = () => {
      // const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      console.log('document.documentElement.clientHeight:', document.documentElement.clientHeight)
      console.log('document.body.clientHeight:', document.body.clientHeight)
    }
    handleHeight()
    const store = useStore()
    let name = ''
    for (let i = 0; i < props.user.userName?.length; i++) {
      if (props.user.userName[i] !== '@') {
        name = name + props.user.userName[i]
      } else {
        break
      }
    }
    const quit = () => {
      store.commit('loginOut')
      localStorage.userInfo = JSON.stringify({})
      router.push('/login')
    }

    return {
      quit,
      store,
      name
    }
  }
})
</script>

<style>

</style>
