<template>
  <div class="SideNav">
    <ul class="nav flex-column" style="text-align: center" @click="handleClick">
      <li class="nav-item dropdown-item">
        <a class="nav-link" aria-current="page" href="#" style="color: black" label="home">封面</a>
      </li>
      <li class="nav-item dropdown-item">
        <a class="nav-link" href="#" style="color: black" label="diary">闲谈杂记</a>
      </li>
      <li class="nav-item dropdown-item">
        <a class="nav-link" href="#" style="color: black" label="video">video</a>
      </li>
      <li class="nav-item dropdown-item">
        <a class="nav-link" href="#" style="color: black" label="game">Game</a>
      </li>
      <!-- <li class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" @click="dropdown" href="#" role="button" aria-haspopup="true" aria-expanded="false">Dropdown</a>
        <div class="dropdown-menu">
          <a class="dropdown-item" href="#">Action</a>
          <a class="dropdown-item" href="#">Another action</a>
          <a class="dropdown-item" href="#">Something else here</a>
          <div class="dropdown-divider"></div>
          <a class="dropdown-item" href="#">Separated link</a>
        </div>
      </li> -->
      <li class="nav-item dropdown-item">
        <a class="nav-link" href="#" style="color: black" label="testpage">test</a>
      </li>
      <li class="nav-item dropdown-item">
        <a class="nav-link" href="#" style="color: black" label="imgmark">Imgmark</a>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import router from '../router/router'
import { log } from '../weapons/index'
export default defineComponent({
  name: 'SideNav',
  setup () {
    const handleClick = (e: MouseEvent) => {
      const label = (e.target as HTMLElement).getAttribute('label')
      log('label:', label)
      router.push(`/${label}`)
    }
    const dropdown = (e: any) => {
      log('============', e)
    }
    return {
      handleClick,
      dropdown
    }
  }
})
</script>

<style>
  .SideNav {
    width: 190px;
    height: 80vh;
    border: 1px solid gainsboro;
    border-bottom: 0px;
    margin-right: 10px;
  }
</style>
