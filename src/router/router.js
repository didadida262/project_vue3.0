import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Diary from '../views/Diary.vue';
import Video from '../views/Video.vue';
import TestPage from '../views/TestPage.vue';
import Imagemark from '../views/Imagemark.vue';
import Game from '../views/Game/Game.vue';
import Steam from '../views/Game/Steam.vue';
import Zombie from '../views/Game/Zombie.vue';
import Salary from '../views/Salary.vue';
import Map from '../views/Map.vue';
import Threejs from '../views/Threejs.vue';
import Music from '../views/Music.vue';
var routerHitory = createWebHistory();
var router = createRouter({
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
        }, {
            path: '/salary',
            name: 'Salary',
            component: Salary
        }, {
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
        }
    ]
});
export default router;
//# sourceMappingURL=router.js.map