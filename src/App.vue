<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png">
  <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/> -->
  <div class="app">
    <!-- <div class="login" v-if="!isLogin">
      <router-view></router-view>
    </div> -->
    <div class="webpage">
    <!-- 头部 -->
      <div ref="headerRef">
        <global-header :user="user"></global-header>
      </div>
      <!-- <loader
        v-if="loading"
        text="死命加载中....">
      </loader> -->
      <!-- 内容 -->
      <div class="middle" ref="middleRef">
        <div class="sidenav">
          <side-nav></side-nav>
        </div>
        <div class="view">
          <router-view ></router-view>
        </div>
      </div>
      <!-- 专栏卡片 -->
      <!-- <column-list :list="list"></column-list> -->
      <!-- 尾部 -->
      <footer class="text-center py-4 text-secondary bg-light mt-6 footer" ref="footerRef">
        <small>
          <ul class="list-inline mb-0">
            <li class="list-inline-item">Didi</li>
            <li class="list-inline-item">Dada</li>
            <li class="list-inline-item">Dodo</li>
            <li class="list-inline-item">Dudu</li>
          </ul>
        </small>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
// import HelloWorld from './components/HelloWorld.vue'
import { computed, defineComponent, onMounted, ref } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
// import ColumnList, { ColumnProps } from './components/ColumnList.vue'
import GlobalHeader from './components/GlobalHeader.vue'
import Login from './view/Login.vue'
import { useStore } from 'vuex'
import Loader from './components/Loader.vue'
import SideNav from './components/SideNav.vue'
import { useRoute } from 'vue-router'
import { log } from './weapons/index'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    SideNav
  },
  setup () {
    const inputRef = ref<object>()
    const flag = true
    const store = useStore()
    const isLogin = computed(() => {
      log('-------APP----------')
      return store.state.user.isLogin
    })
    const loading = computed(() => store.state.loading)
    const route = useRoute()
    // const user = JSON.parse(localStorage.userInfo)
    // const user = localStorage.userInfo
    const user = { userName: 'hhvcg', userPd: '11a' }
    const headerRef = ref<null | HTMLElement>(null)
    const middleRef = ref<null | HTMLElement>(null)
    const footerRef = ref<null | HTMLElement>(null)
    const autoHeight = () => {
      // 中间内容显示区域高度自适应
      window.addEventListener('resize', () => {
        console.log('窗口变化')
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        middleRef.value.style.height = clientHeight - headerRef.value?.clientHeight - footerRef.value?.clientHeight + 'px'
      })
    }
    autoHeight()
    onMounted(() => {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      middleRef.value.style.height = clientHeight - headerRef.value?.clientHeight - footerRef.value?.clientHeight + 'px'
    })

    return {
      inputRef,
      store,
      loading,
      isLogin,
      route,
      user,
      flag,
      autoHeight,
      headerRef,
      middleRef,
      footerRef
    }
  }
})

</script>

<style lang="less">
  @import './css/App.less';
</style>
