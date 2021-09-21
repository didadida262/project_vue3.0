<template>
  <div class="test">
    <p>test</p>
    <!-- <h1>{{ age }}</h1> -->
    <h1>{{ obj }}</h1>
    <a-button @click="changeObj">changeObj</a-button>
    <!-- <video src="" id="player"></video>
    <p>{{ blob }}</p>
    <p>{{ showBlob }}</p> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log } from '../weapons/index'
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
      name: ''
    }
    Object.defineProperty(obj, 'name', {
      get () {
        log('你正在访问那么')
        return this.name
      },
      set (val) {
        log('你在改变')
        log('val:', val)
        this.name = val
      }
    })
    const changeObj = () => {
      obj.name = 'hhcsa'
      log('1')
    }
    const store = useStore()
    const age = computed(() => {
      return store.state.age
    })
    const addAge = () => {
      store.dispatch('asaddAge', 4000)
    }
    return {
      addAge,
      age,
      obj,
      changeObj
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .divone {
    width: 200px;
    float: left;
    border: 1px solid red;
    height: 100px;
  }
  .divtwo {
    border: 1px solid green;
    margin-left: 200px;
    height: 100px;
  }

</style>
