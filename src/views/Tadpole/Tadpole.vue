<template>
  <div class="Tadpole">
    <canvas resize id="main-canvas" class="main-canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import paper from 'paper'
import { useStore } from 'vuex'
import { log } from '../../weapons/index'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Tadpole',
  setup () {
    // 测试paper特性函数
    const testDrawing = () => {
      // Now, draw your things based on component state.
      paper.setup(document.getElementById('main-canvas'))
      const path = new paper.Path.Star({
        center: paper.view.center,
        points: 300,
        radius1: 100,
        radius2: 100,
        strokeColor: 'red'
        // fillColor: 'red'
      })
      window.onresize = () => {
        log('窗口大小变化！')
        path.position = paper.view.center
      }
    }
    const ini = () => {
      paper.setup(document.getElementById('main-canvas'))
      const direct = [] as any
      let myPath = null as any
      const tool = new paper.Tool()
      tool.onMouseDown = (e: any) => {
        myPath = new paper.Path()
        myPath.strokeColor = 'red' as any
        myPath.strokeWidth = 20 as any
        // console.log('mouse--down')
        myPath.add(e.point)
      }
      tool.onMouseUp = () => {
        direct.push(myPath)
        console.log('当前路径库:', direct)
      }
      tool.onMouseDrag = (e: any) => {
        console.log('mouse--drag')
        myPath.add(e.point)
      }
    }
    // 蝌蚪军
    const boids = []
    // ready！
    const initialize = () => {
      // 创建蝌军团
      for (let i = 0; i < 300; i++) {
        const position = (paper.Point.random() as any) * (paper.view.viewSize as any)
        // boids.push(new Boid(position, 10, 0.05));
      }
    }
    onMounted(() => {
      log('This is Tad--Pole!!!')
      // testDrawing()
      // initialize()
      ini()
    })
    return {
      paper
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.Tadpole {
  width: 100%;
  height: 100%;
  // background-color: black;

  .main-canvas {
    border: 1px solid black;
    background-color: gray;
  }
}

// html,
// body {
//     margin: 0;
//     overflow: hidden;
//     height: 100%;
// }

// /* Scale canvas with resize attribute to full size */
canvas[resize] {
    width: 100%;
    height: 100%;
}

</style>
