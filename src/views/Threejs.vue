<template>
  <h1>threeJS</h1>
  <div id="threejs">
      <div id="container"></div>
  </div>
  <div><img src="./test/NormalMap.png" alt=""></div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log } from '../weapons/index'
import * as Three from 'three'
import { OrbitControls } from 'three-orbit-controls'
import * as dat from 'dat.gui'

export default defineComponent({
  name: 'Threejs',
  setup () {
    log('threejs')
    let camera = '' as any
    let scene = '' as any
    let mesh = '' as any
    let renderer = '' as any
    const init = () => {
      // Debug
      const gui = new dat.GUI()
      // loading
      const textureLoader = new Three.TextureLoader()
      const normalTexture = textureLoader.load('./test/NormalMap.png')
      const container = document.getElementById('container') as any
      camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10)
      camera.position.z = 0.6
      scene = new Three.Scene()
      scene.add(camera)

      const geometry = new Three.SphereBufferGeometry(0.2, 64, 64)
      const material = new Three.MeshStandardMaterial()
      // material.normalMap = normalTexture

      material.metalness = 0.7
      material.roughness = 0.2
      log('normalTexture:', normalTexture)
      material.color = new Three.Color(0x292929)

      // box
      // const geometry = new Three.BoxGeometry(0.2, 0.2, 0.2)
      // const material = new Three.MeshNormalMaterial()
      mesh = new Three.Mesh(geometry, material)
      scene.add(mesh)

      // Lights

      const pointLight = new Three.PointLight(0xffffff, 0.2)
      pointLight.position.set(2, 3, 4)
      // pointLight.intensity = 1
      scene.add(pointLight)

      gui.add(pointLight.position, 'x').min(-3).max(3).step(0.01)
      gui.add(pointLight.position, 'y').min(-3).max(3).step(0.01)
      gui.add(pointLight.position, 'z').min(-3).max(3).step(0.01)
      const pointLightHelper = new Three.PointLightHelper(pointLight, 0.1)
      scene.add(pointLightHelper)

      renderer = new Three.WebGLRenderer({
        alpha: true
       })
      renderer.setSize(container.clientWidth, container.clientHeight)
      container.appendChild(renderer.domElement)
    }
    const clock = new Three.Clock()
    const animate = () => {
      requestAnimationFrame(animate)
      // mesh.rotation.x += 0.01
      // mesh.rotation.y += 0.02
      const elapsedTime = clock.getElapsedTime()
      // Update objects
      mesh.rotation.y = 0.5 * elapsedTime
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
  border: 1px solid red;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  /* color: #2c3e50; */
  margin-top: 60px;
  background: rgb(24, 24, 24);
}
#container {
  height: 400px;
}
</style>
