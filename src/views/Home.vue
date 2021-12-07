<template>
  <div class="Home">
    <div>
      <span class="slogan">Fuck Every Day!</span>
      <span class="slogan">{{ world }}</span>
    </div>
    <a-button @click="test">测试</a-button>
    <div class="img-st"><img :src="imgUrl" alt=""></div>
    <audio
     class="audio"
     loop
     :src="audioUrl" controls="controls" autoplay></audio>
  </div>
</template>

<script lang='ts'>
import { getStart, getImg, getMusic } from '@/api/common'
import { useStore } from 'vuex'
import { ref } from 'vue'
import { _arrayBufferToBase64 } from '@/utils/utils'
// import router from '../router/router'
import bus from './Bus'
export default {
  setup () {
    const store = useStore()
    const world = ref('')
    const audioUrl = ref('')
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
      let url = 'data:image/jpeg;base64,'
      url = url + _arrayBufferToBase64(res)
      imgUrl.value = url
    })
    getMusic().then((res) => {
      console.log('music:', res)
      let url = 'data:audio/mp3;base64,'
      url = url + _arrayBufferToBase64(res)
      console.log('url:', url)
      audioUrl.value = url
    })
    return {
      world,
      test,
      imgUrl,
      audioUrl
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
