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
        boid.run()
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
      for (let i = 0; i < 100; i++) {
        const position = getRandomPoint(WIDTH.value, HEIGHT.value)
        const boid = new Boid(position)
        BoidsResp.push(boid)
      }
    }
    // 蝌蚪军
    // ready！
    onMounted(() => {
      initWorld()
      drawData()
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
