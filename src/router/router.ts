import store from '@/store/store'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SideNav from '../components/SideNav.vue'
import BeautifulNewWorld from '../views/BeautifulNewWorld.vue'
import Diary from '../views/Diary.vue'
import Video from '../views/Video.vue'
import TestPage from '../views/TestPage.vue'
import Game from '../views/Game/Game.vue'
import Steam from '../views/Game/Steam.vue'
import { log } from '../weapons/index'
const routerHitory = createWebHistory()
const router = createRouter({
  history: routerHitory,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/sidenav',
      name: 'SideNav',
      component: SideNav,
      meta: { requiredLogin: true }
      // 元信息，用于权限管理
    },
    {
      path: '/bnw',
      name: 'beautifulnewworld',
      component: BeautifulNewWorld
    },
    {
      path: '/diary',
      name: 'Diary',
      component: Diary
    },
    {
      path: '/video',
      name: 'Video',
      component: Video
    },
    {
      path: '/testpage',
      name: 'Testpage',
      component: TestPage
    },
    {
      path: '/game',
      name: 'Game',
      component: Game,
      children: [
        {
          path: 'steam',
          name: 'Steam',
          component: Steam
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const userInfo = localStorage.userInfo
  log('----router---')
  log('to.name:', to.name)
  if (to.name !== 'Login' && userInfo === '{}') {
    log('未登录')
    next({ path: '/login' })
  } else {
    if (userInfo !== '{}') {
      log('已登录')
      store.commit('login', userInfo)
    }
    next()
  }
})

export default router
