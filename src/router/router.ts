import store from '@/store/store'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SideNav from '../components/SideNav.vue'
import BeautifulNewWorld from '../views/BeautifulNewWorld.vue'
import Diary from '../views/Diary.vue'
import Video from '../views/Video.vue'
import TestPage from '../views/TestPage.vue'
import Imagemark from '../views/Imagemark.vue'
import Game from '../views/Game/Game.vue'
import Steam from '../views/Game/Steam.vue'
import Zombie from '../views/Game/Zombie.vue'
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
      path: '/game',
      name: 'Game',
      component: Game,
      children: [
        {
          path: 'steam',
          name: 'Steam',
          component: Steam
        },
        {
          path: 'zombie',
          name: 'Zombie',
          component: Zombie
        }
      ]
    },
    {
      path: '/testpage',
      name: 'Testpage',
      component: TestPage
    },
    {
      path: '/imgmark',
      name: 'Imagemark',
      component: Imagemark
    }
  ]
})

router.beforeEach((to, from, next) => {
  log('router:to', to)
  log('router:from', from)
  const userInfo = localStorage.userInfo
  if (to.name !== 'Login' && userInfo === '{}') {
    next({ path: '/login' })
  } else {
    if (userInfo !== '{}') {
      store.commit('login', userInfo)
    }
    next()
  }
})

export default router
