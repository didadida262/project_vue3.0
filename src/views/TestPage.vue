<template>
  <div class="test">
    <p>test</p>
    <a-button @click="debounce">click</a-button>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log, change } from '../weapons/index'
interface SelectProtected {
    readonly wrapperElement: HTMLDivElement;
    readonly videoElement: HTMLVideoElement;
}
// import { commonAPI } from '../api/common'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default defineComponent({
  name: 'TestPage',
  setup () {
    const obj = {
      name: 'hhvcg'
    }
    change(obj)
    console.log('obj:', obj)
    const f = function () {
      let timer = null as any
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('click')
        }, 1000)
      }
    }
    const debounce = f()
    return {
      debounce
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
