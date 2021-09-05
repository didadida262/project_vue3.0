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
      <li class="nav-item dropdown-item">
        <a class="nav-link" href="#" style="color: black" label="testpage">test</a>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import router from '../router/router'

export default defineComponent({
  name: 'SideNav',
  setup () {
    const handleClick = (e: MouseEvent) => {
      const label = (e.target as HTMLElement).getAttribute('label')
      router.push(`/${label}`)
    }
    return {
      handleClick
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
