<template>
  <div class="imgmark">
    <h1>坑爹啊</h1>
    <div id="picarea" class="picarea"></div>

    <!-- <video src="" id="player"></video>
    <p>{{ blob }}</p>
    <p>{{ showBlob }}</p> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { log } from '../weapons/index'
interface SelectProtected {
    readonly wrapperElement: HTMLDivElement;
    readonly videoElement: HTMLVideoElement;
}
interface Point {
  x: number;
  y: number;
}
// import { commonAPI } from '../api/common'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default defineComponent({
  name: 'TestPage',
  setup () {
    const start: Point = {
      x: 0,
      y: 0
    }
    const end: Point = {
      x: 0,
      y: 0
    }
    const canvasInit = () => {
      // 获得图片显示区域dom
      const pic = document.getElementsByClassName('picarea')[0] as HTMLElement
      // 点击鼠标获得点击位置的x，y，也就是要绘制的矩形框的左上那个点。
      // 其中，clientX,Y能够获取点击像素点相对于屏幕的x，y。offsetLeft和offsetTop获取该点所在div的左上角那个点，相对于屏幕的左边距和顶边距。
      // 通过上述两部分相见，可以获得鼠标点击点在点击区域内的相对坐标点。
      pic.onmousedown = (e) => {
        const kuang = document.createElement('div')
        kuang.setAttribute('class', 'kuang')
        kuang.style.display = 'none'
        kuang.style.border = '1px solid red'
        pic.appendChild(kuang)
        const clientX = e.clientX
        const clientY = e.clientY
        const areaOffsetX = pic.offsetLeft
        const areaOffsetY = pic.offsetTop
        const x = clientX - areaOffsetX
        const y = clientY - areaOffsetY
        log('起始点坐标：', x, y)
        start.x = Number(x)
        start.y = Number(y)
        pic.onmousemove = (e) => {
          const clientX = e.clientX
          const clientY = e.clientY
          const areaOffsetX = pic.offsetLeft
          const areaOffsetY = pic.offsetTop
          const x = clientX - areaOffsetX
          const y = clientY - areaOffsetY
          end.x = Number(x)
          end.y = Number(y)
          kuang.style.width = end.x - start.x + 'px'
          kuang.style.height = end.y - start.y + 'px'
          kuang.style.position = 'absolute'
          kuang.style.top = start.y + 'px'
          kuang.style.left = start.x + 'px'
          kuang.style.display = 'inline-block'
        }
      }
      log('pic:', pic)
      // pic.onmousemove = (e) => {
      //   log('-----yidong')
      // }
      pic.onmouseup = (e) => {
        const kuang = document.getElementsByClassName('kuang')[document.getElementsByClassName('kuang').length - 1] as HTMLElement
        kuang.style.display = 'none'
        log('kuang:', kuang)
        // const clientX = e.clientX
        // const clientY = e.clientY
        // const areaOffsetX = pic.offsetLeft
        // const areaOffsetY = pic.offsetTop
        // const x = clientX - areaOffsetX
        // const y = clientY - areaOffsetY
        // log('重点：', x, y)

        // const kuang = document.createElement('div')
        // kuang.setAttribute('class', 'kuang')

        // log('kuang', kuang)
        // log('pic', pic)
        // pic.appendChild(kuang)
      }
    }
    onMounted(() => {
      canvasInit()
    })
    return {
      canvasInit
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  // @import '../css/Imgmark.less';
  .imgmark{
    width: 100%;
    height:100%;
    /* background:transparent url("../assets/avatar_null.png") no-repeat scroll -70px -40px; */
    /* background:transparent url("../assets/avatar_null.png") no-repeat scroll 10px 10px; */
    border:1px solid green;
    #picarea {
      width: 300px;
      height: 600px;
      border: 1px solid red;
      margin: 100px auto;
      position: relative;
    }
  }
</style>
