<template>
  <div class="Home">
    <a-row>
      <a-col :span='20'>
        <div>
          <span class="slogan">Fuck Every Day!</span>
          <span class="slogan">{{ world }}</span>
        </div>
        <div class="img-st"><img :src="imgUrl" alt="">
        </div>
      </a-col>
      <a-col :span='4'>
        <div>
          <a-steps progress-dot direction="vertical" size='normal'>
            <a-step v-for="(item, key) in articles" :key="key" >
              <template v-slot:title>{{ item.date }}</template>
              <template v-slot:description>{{ item.description}}</template>
            </a-step>
          </a-steps>
        </div>
      </a-col>
    </a-row>

    <!-- <audio
     class="audio"
     loop
     :src="audioUrl" controls="controls" autoplay></audio> -->
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
    const articles = [
      {
        date: '12月11号',
        description: '我们走着看！！！！！！！'
      },
      {
        date: '12月11号',
        description: '我们走着看！！！！！！！'
      },
      {
        date: '12月11号',
        description: '我们走着看！！！！！！！'
      }
    ]
    store.commit('handelLoading', true)
    getStart().then((res: any) => {
      world.value = res.words
      store.commit('handelLoading', false)
    })
    getImg().then((res) => {
      let url = 'data:image/jpeg;base64,'
      url = url + _arrayBufferToBase64(res)
      imgUrl.value = url
    })
    getMusic().then((res) => {
      let url = 'data:audio/mp3;base64,'
      url = url + _arrayBufferToBase64(res)
      console.log('url:', url)
      audioUrl.value = url
    })
    return {
      world,
      imgUrl,
      audioUrl,
      articles
    }
  }

}
</script>

<style scoped>
ant-steps-dot .ant-steps-item-content, .ant-steps-dot.ant-steps-small .ant-steps-item-content {
    width: 90% !important;
}
  .Home {
    height: 100%;
    /* display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center; */
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
