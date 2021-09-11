<template>
  <div class="SideNav">
    <a-menu
      style="width: 256px"
      :default-selected-keys="['1']"
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
          <span>steam</span>
        </a-menu-item>
        <a-menu-item key="game/zombie">
          <span>zombie</span>
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item key="testpage">
          <span>testpage</span>
      </a-menu-item>
      <a-menu-item key="imgmark">
          <span>imgmark</span>
      </a-menu-item>
      <a-menu-item key="salary">
          <span>salary</span>
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
    const handleClick = (e: any) => {
      // const label = (e.target as HTMLElement).getAttribute('label')
      log('e:', e)
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
      titleClick
    }
  }
})
</script>

<style>
  .SideNav {
    /* width: 190px; */
    /* height: 80vh; */
    border: 1px solid gainsboro;
    border-bottom: 0px;
    margin-right: 10px;
  }
</style>
