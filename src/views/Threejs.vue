<template>
  <h1>threeJS</h1>
  <div id="threejs">
      <div id="container"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log } from '../weapons/index'
import * as Three from 'three'
import { OrbitControls } from 'three-orbit-controls'

export default defineComponent({
  name: 'Threejs',
  setup () {
    log('threejs')
    let camera = '' as any
    let scene = '' as any
    let mesh = '' as any
    let renderer = '' as any
    const init = () => {
      const container = document.getElementById('container') as any
      camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10)
      camera.position.z = 0.6
      scene = new Three.Scene()
      const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      const material = new Three.MeshNormalMaterial()
      mesh = new Three.Mesh(geometry, material)
      scene.add(mesh)

      renderer = new Three.WebGLRenderer({ antialias: true })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)
    }
    const animate = () => {
      requestAnimationFrame(animate)
      mesh.rotation.x += 0.01
      // mesh.rotation.y += 0.02
      renderer.render(scene, camera)
    }
    onMounted(() => {
      init()
      animate()
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#threejs {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#container {
  height: 400px;
}
</style>
