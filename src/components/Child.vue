<template>
  <div class="Child">
    <p>我是儿子</p>
    <a-button @click="change">Click</a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../weapons/index'

export default defineComponent({
  name: 'Child',
  setup (props, context) {
    console.log('child')
    const change = () => {
      console.log(props.msg)
    }
    return {
      change
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Child {
    //
  }
</style>
