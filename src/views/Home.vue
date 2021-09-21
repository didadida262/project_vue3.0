<template>
  <div class="Home">
    <p class="slogan">Fuck Every Day!</p>
    <p class="slogan">{{ world }}</p>
    <!-- <img src="@/assets/desk.jpg" alt=""> -->
    <!-- <router-link class="btn btn-danger mb-3"><p>asd</p></router-link> -->
    <!-- <div><button class="btn btn-success mb-3">开启伟大时代</button>
    </div> -->
    <audio
     class="audio"
     loop
     src="http://m701.music.126.net/20210801215212/9d301aa15bf872a60b6368f95ee97d77/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/4119874/37c3/0ce7/b90f/b0b4023a3e684f20c33046c5aa329851.mp3" controls="controls" autoplay></audio>
  </div>
</template>

<script lang='ts'>
import { commonAPI } from '../api/common'
import { useStore } from 'vuex'
import { ref } from 'vue'
import router from '../router/router'

export default {
  setup () {
    const store = useStore()
    const world = ref('alloha')
    store.commit('handelLoading', true)
    // commonAPI.getStart().then((res) => {
    //   world.value = JSON.stringify(res)
    //   console.log('res.data:', res)
    //   store.commit('handelLoading', false)
    // })
    // commonAPI.getUser().then((res) => {
    //   console.log('user:', res)
    // })

    return {
      world
    }
  }

}
</script>

<style>
  .Home {
    height: 60vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-image: url('../assets/desk.jpg');
  }
  .slogan {
    color:lightcoral;
    font-size: 30px;
  }
  .audio {
    z-index: -100;
  }
</style>
