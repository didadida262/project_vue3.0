<template>
  <div class="index">
    <div class="webpage">
    <!-- 头部 -->
      <div ref="headerRef">
        <global-header :user="user"></global-header>
      </div>
      <div class="middle" ref="middleRef">
        <div class="sidenav">
          <side-nav></side-nav>
        </div>
        <div class="view">
          <router-view></router-view>
        </div>
      </div>
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
import { computed, defineComponent, onMounted, ref, watch } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '../components/GlobalHeader.vue'
import Login from 'Login.vue'
import { useStore } from 'vuex'
import Loader from '../components/Loader.vue'
import SideNav from '../components/SideNav.vue'
import { useRoute } from 'vue-router'
import { log } from '../weapons/index'
import router from '@/router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style

export default defineComponent({
  name: 'index',
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
      console.log(window.sessionStorage.getItem('token'))
      return window.sessionStorage.getItem('token') !== null
    })
    const loading = computed(() => store.state.loading)
    const route = useRoute()
    const user = window.sessionStorage.getItem('userInfo')
    const headerRef = ref<null | HTMLElement>(null)
    const middleRef = ref<null | HTMLElement>(null)
    const footerRef = ref<null | HTMLElement>(null)
    const autoHeight = () => {
      // 中间内容显示区域高度自适应
      window.addEventListener('resize', () => {
        const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
        middleRef.value.style.height = clientHeight - headerRef.value?.clientHeight - footerRef.value?.clientHeight - 10 + 'px'
      })
    }
    autoHeight()
    onMounted(() => {
      const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
      middleRef.value.style.height = clientHeight - headerRef.value?.clientHeight - footerRef.value?.clientHeight - 10 + 'px'
    })
    watch(() => router.fullPath, () => {
      console.log('路由变化')
    })
    NProgress.configure({ showSpinner: false })
    NProgress.start()
    onMounted(() => {
      console.log('index----mounted!!!')
      NProgress.done()
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
  @import '../css/index.less';
  *::-webkit-scrollbar {width:7px; height:10px; background-color:transparent;} /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
  *::-webkit-scrollbar-track {background-color:white;  } /*定义滚动条轨道 内阴影+圆角*/
  *::-webkit-scrollbar-thumb {background-color: gray; border-radius:6px;} /*定义滑块 内阴影+圆角*/
  .scrollbarHide::-webkit-scrollbar{display: none}
  .scrollbarShow::-webkit-scrollbar{display: block}
</style>
