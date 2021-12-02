<template>
  <div class="SideNav">
    <a-menu
      style="width: 256px"
      :default-selected-keys="current"
      mode="inline"
      @click="handleClick"
    >
      <a-menu-item key="home">
        <span>Home</span>
      </a-menu-item>
      <a-menu-item key="diary">
        <span>Diary</span>
      </a-menu-item>
      <a-menu-item key="video">
        <span>Video</span>
      </a-menu-item>
      <a-sub-menu key="game" title="Game">
        <a-menu-item key="game/steam">
          <span>Steam</span>
        </a-menu-item>
        <a-menu-item key="game/zombie">
          <span>Zombie</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="testpage">
          <span>Testpage</span>
      </a-menu-item>
      <a-menu-item key="imgmark">
          <span>Imgmark</span>
      </a-menu-item>
      <a-menu-item key="salary">
          <span>Salary</span>
      </a-menu-item>
      <a-menu-item key="map">
          <span>Map</span>
      </a-menu-item>
      <a-menu-item key="threejs">
          <span>Threejs</span>
      </a-menu-item>
      <a-menu-item key="music">
          <span>Music</span>
      </a-menu-item>
      <a-menu-item key="echart">
          <span>Echarts</span>
      </a-menu-item>
    </a-menu>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import router from '../router/router'
import { log } from '../weapons/index'
export default defineComponent({
  name: 'SideNav',
  setup () {
    const current = ['home']
    const handleClick = (e: any) => {
    // const target = router.currentRoute.value.path
    // current.pop()
    // current.push(target)
    // console.log('ta', target)
    // current = target.substr(0)
    router.push(`/${e.key}`)
    }
    const dropdown = (e: any) => {
      log('============', e)
    }
    const titleClick = (e: any) => {
      log('e:', e)
    }
    return {
      handleClick,
      dropdown,
      titleClick,
      current
    }
  }
})
</script>

<style>
</style>
