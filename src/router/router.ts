import store from '@/store/store'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import index from '../views/index.vue'
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
import Salary from '../views/Salary.vue'
import Map from '../views/Map.vue'
import Threejs from '../views/Threejs.vue'
import Echart from '../views/echart/index.vue'
import Music from '../views/Music.vue'
import { log } from '../weapons/index'
const routerHitory = createWebHistory()
const router = createRouter({
  history: routerHitory,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'index',
      component: index,
      children: [
        {
          path: '/home',
          name: 'Home',
          component: Home
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
        },
        {
          path: '/salary',
          name: 'Salary',
          component: Salary
        },
        {
          path: '/map',
          name: 'Map',
          component: Map
        },
        {
          path: '/threejs',
          name: 'Threejs',
          component: Threejs
        },
        {
          path: '/music',
          name: 'Music',
          component: Music
        },
        {
          path: '/echart',
          name: 'Echart',
          component: Echart
        }
      ]
    }
  ]
})
router.beforeEach((to, from, next) => {
  log('router:to', to)
  log('router:from', from)
  next()
  // if (to.path === '/path') {
  //   next()
  // }
})

export default router
