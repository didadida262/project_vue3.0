<template>
  <div class="Home">
    <div>
      <span class="slogan">Fuck Every Day!</span>
      <span class="slogan">{{ world }}</span>
    </div>
    <!-- <a-button @click="test">测试</a-button> -->
    <div class="img-st"><img :src="imgUrl" alt=""></div>
    <!-- <audio
     class="audio"
     loop
     src="http://m701.music.126.net/20210801215212/9d301aa15bf872a60b6368f95ee97d77/jdymusic/obj/wo3DlMOGwrbDjj7DisKw/4119874/37c3/0ce7/b90f/b0b4023a3e684f20c33046c5aa329851.mp3" controls="controls" autoplay></audio> -->
  </div>
</template>

<script lang='ts'>
import { getStart, getImg } from '@/api/common'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { _arrayBufferToBase64 } from '@/utils/utils'
// import router from '../router/router'
import bus from './Bus'
export default {
  setup () {
    const store = useStore()
    const world = ref('')
    const imgUrl = ref('')
    store.commit('handelLoading', true)
    const test = () => {
      bus.$emit('change', 'lalalalla')
    }
    getStart().then((res) => {
      console.log('res:', res)
      world.value = JSON.stringify(res)
      store.commit('handelLoading', false)
    })

    getImg().then((res) => {
      console.log('tupian1-->:', res)
      let url = 'data:image/jpeg;base64,'
      url = url + _arrayBufferToBase64(res)
      imgUrl.value = url
      console.log('tupian2-->:', imgUrl.value)
    })
    return {
      world,
      test,
      imgUrl
    }
  }

}
</script>

<style>
  .Home {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .slogan {
    color:lightcoral;
    font-size: 30px;
    display: block;
  }
  .audio {
    z-index: -100;
  }
  .img-st {
    position: absolute;
    top: 100px;
    z-index: -1;
  }
</style>
