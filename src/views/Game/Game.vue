<template>
  <div class="game">
    <!-- 游戏首页 -->
    <div class="index" v-if="indexFlag">
      <h2 style="color: red">双人打僵尸</h2>
      <button type="button" class="btn btn-primary btn-lg but" @click="enterGame">进入游戏</button>
      <button type="button" class="btn btn-secondary btn-lg but" @click="options">选项</button>
    </div>
    <router-view></router-view>
    <!-- 进入游戏 -->
    <!-- <div class="steam" v-show="!indexFlag">
      <div id="role"> </div>
      <canvas width="360" height="520"></canvas>
    </div> -->
  </div>

</template>

<script lang="ts">
import router from '@/router/router'
import { defineComponent, ref } from 'vue'
import { log } from '../../weapons/index'

export default defineComponent({
  name: 'Game',
  setup () {
    // eslint-disable-next-line prefer-const
    let indexFlag = ref(true)
    const enterGame = () => {
      log('enterGame')
      indexFlag.value = false
      router.push('/game/steam')
      // initCanvas()
    }
    const options = () => {
      log('options')
    }
    return {
      indexFlag,
      enterGame,
      options
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../css/Game.less';
</style>
