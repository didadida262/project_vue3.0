<!--
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:13:14
 * @LastEditors: -_-
 * @Description: 全局跟组件app
-->
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
    console.log('---App--setup>>>')
  }
})

</script>

<style lang="less">
</style>
