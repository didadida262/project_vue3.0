<template>
  <div id="music">
    <div class="music-player">
      <div class="info">
        <div class="left">
          <a href="#" class="icon-praise"></a>
          <a href="#" class="icon-love"></a>
        </div>
        <div class="center">
          <img src="../assets/icon.png" width="80" height="80" id="logo">
        </div>
        <div class="right">
          <a href="#" class="icon-model"></a>
          <a href="#" class="icon-share"></a>
        </div>
        <div class="progress">
          <span class="jp-play-bar"></span>
        </div>
      </div>
      <div class="controls">
        <div class="current">00:00</div>
        <div class="play-controls">
          <a href="#" class="icon-back"></a>
          <a href="#" class="icon-play"></a>
          <a href="#" class="icon-pause icon-hide"></a>
          <a href="#" class="icon-next"></a>
        </div>

        <div class="volume-level">
          <a href="#" class="icon-volume-down"></a>
          <div class="volume-progress">
            <span class="jp-volume-bar"></span>
          </div>
          <a href="#" class="icon-volume-up"></a>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log, e } from '../weapons/index'

// import { commonAPI } from '../api/common'

export default defineComponent({
  name: 'Music',
  setup () {
    let musicBox = null as any
    const songs: any[] = []
    const addSong = (name: string) => {
      songs.push('./media/' + name)
    }
    const playSong = (index: number) => {
      musicBox.src = songs[index]
      musicBox.play()
    }
    // 初始化播放器
    const initMusic = () => {
      musicBox = e('audio')
      const par = document.getElementById('music') as any
      console.log('par:', par)
      console.log('musicBox:', musicBox)
      // par.appendChild(musicBox)
      // musicBox.src = 'https://link.zhihu.com/?target=http%3A//music.163.com/song/media/outer/url%3Fid%3D1880886636.mp3'
      // musicBox.play()
      log('musicBox:', musicBox)
      // addSong('诚如神之所说.mp3')
      // addSong('小姐.mp3')
      // playSong(0)
    }
    onMounted(() => {
      initMusic()
      // songUrl = URL.createObjectURL('../media/诚如神之所说.mp3')
    })
    return {
      musicBox
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#music {
  margin: 10px auto;
  background: #eee url('../assets/back-image.jpg') no-repeat center;
  width: 700px;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.music-player {
    position: relative;
    width: 350px;
    height: 290px;
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    background: #222;
    overflow: hidden;
}

.music-player .info{
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: relative;
}

.music-player .controls{
  text-align: center;
  width: 100%;
  height: 190px;
  background: rgba(47,47,47,0.9);
}

.music-player .info .left{
  width: 25px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.music-player .info .right{
  width: 25px;
  position: absolute;
  top: 30px;
  right: 30px;
}

.music-player .info [class^="icon-"]{
  margin:0 0 10px;
}

[class^="icon-"]{
  width: 18px;
  height: 18px;
  display: block;
  cursor: pointer;
}

.icon-praise {
  background-image: url('../assets/praise.png') no-repeat center;
}

.icon-love {
  background: url('../assets/love.png') no-repeat center;
}

.icon-share{
  background: url('../assets/share.png') no-repeat center;
}

.icon-model{
  background: url('../assets/model.png') no-repeat center;
}

.music-player .progress{
  width: 100%;
  height: 5px;
  /* border: 1px solid red; */
  background: #000;
  position: absolute;
  bottom: 0px;
  cursor: pointer;
}
.music-player .progress span{
  position: relative;
  display: block;
  background: #ed553b;
  cursor: pointer;

  height: 100%;
}
.music-player .current{
  font-size: 48px;
  color:rgba(225,225,225,0.4);
  padding: 15px 0 20px;
}

.music-player .play-controls a{
  display: inline-block;
  width: 35px;
  height: 40px;
  margin: 0 30px;
}

.icon-back{
  background: url('../assets/back.png') no-repeat center;
}

.icon-next{
  background: url('../assets/next.png') no-repeat center;
}

.icon-pause{
  background: url('../assets/pause.png') no-repeat center;
}

.icon-play{
  background: url('../assets/play.png') no-repeat center;
}

.icon-hide{
  display: none !important;

}

.icon-volume-up{
  background: url('../assets/max-audio.png') no-repeat center;
}

.icon-volume-down{
  background: url('../assets/min-audio.png') no-repeat center;
}

.volume-level {
  width: 100%;
  height: 30px;
  position: relative;
}
.icon-volume-up{
  position: absolute;
  top: 20%;
  right: 62px;
  width: 19px;
}

.icon-volume-down{
  position: relative;
  top: 20%;
  left: 71px;
}

.music-player .volume-progress{
  width: 157px;
  height: 2px;
  /* border: 1px solid red; */
  background: #000;
  position: absolute;
  bottom: 13px;
  cursor: pointer;
  left: 98px;
}
.music-player .volume-progress span{
  position: relative;
  display: block;
  background: #ed553b;
  cursor: pointer;

  height: 100%;
}

.music-player .controls .current {
    font-size: 48px;
    color: rgba(225, 225, 225, 0.4);
    padding: 15px 0 20px;
}

.title_text{
  font-size: 40px;
  font-weight: 300;
  text-decoration: none;
  color: rgba(225, 225, 225, 0.4);
  position: relative;
  top: 26px;
  left: 1px;
}

/* logo图标设置 */
#logo{
  position: absolute;
  top: 10px;
  left: 140px;
  animation: App-logo-spin infinite 20s linear;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo-pause{
  animation-play-state: paused !important;
}

.logo-play{
  animation-play-state: running !important;
}

</style>
