<!--
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:10:26
 * @LastEditors: Hhvcg
-->
<template>
  <div class="Tadpole">
    <canvas
      ref="canvas"
      resize
      id="main-canvas"
      class="main-canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import paper from 'paper'
import { useStore } from 'vuex'
import { getRandomPoint } from '../../weapons/index'
import { message } from 'ant-design-vue'
import { Boid } from './Boids'

export default defineComponent({
  name: 'Tadpole',
  setup () {
    const BoidsResp: Array = []
    const canvas = ref(null)
    const WIDTH = ref(0)
    const HEIGHT = ref(0)
    const onFrame = (e: any) => {
      // console.log('frame!!', BoidsResp.value)
      BoidsResp.forEach((boid: Boid) => {
        boid.run(BoidsResp)
      })
    }

    const initWorld = () => {
      WIDTH.value = canvas.value.clientWidth
      HEIGHT.value = canvas.value.clientHeight
      const paperScope = paper as any
      paperScope.setup(canvas.value)
      paperScope.project.name = 'tadpole'
      paperScope.view.onFrame = onFrame
    }
    const drawData = () => {
      for (let i = 0; i < 50; i++) {
        const position = getRandomPoint(WIDTH.value, HEIGHT.value)
        const boid = new Boid(position, { width: WIDTH.value, heigth: HEIGHT.value }, 10, 0.05)
        BoidsResp.push(boid)
      }
      console.log('BoidsResp>>', BoidsResp)
    }
    const testMatrix = () => {
      const t = new paper.Path.Circle({
        center: new paper.Point(500, 500),
        radius: 15,
        fillColor: 'red'
      })
      const path = new paper.Path({
        // strokeColor: 'green',
        strokeWidth: 10,
        selected: true
      })
      path.add(new paper.Point(100, 100))
      path.add(new paper.Point(200, 200))
      path.add(new paper.Point(300, 300))
      path.add(new paper.Point(400, 400))
      setTimeout(() => {
        path.segments[3].point = new paper.Point(300, 400)
      }, 2000)
    }
    // 蝌蚪军
    // ready！
    onMounted(() => {
      initWorld()
      drawData()
      // testMatrix()
    })
    return {
      canvas
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
