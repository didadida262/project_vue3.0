<template>
  <div class="Child">
    <h1>我是儿子</h1>
    <p>{{msg.name}}</p>
    <a-button @click="change">Click</a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../weapons/index'

export default defineComponent({
  name: 'Child',
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  emits: ['getData'],
  setup (props, context) {
    console.log('child-->')
    const change = () => {
      const data = props.msg
      data.name += '+++'
      context.emit('getData', data)
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
