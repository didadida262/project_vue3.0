<template>
  <div class="app">
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'bootstrap/dist/css/bootstrap.min.css'

export default defineComponent({
  name: 'App',
  setup () {
    console.log('---appp----')
  }
})

</script>

<style lang="less">
</style>
