<template>
  <div class="echart">
    <p>echart</p>
    <div class="graph-box">
      <graph-echart />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import graphEchart from './graphEchart.vue'
// import ratioEchart from './ratioEchart.vue'
// import { useStore } from '@/vuex/index'
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
  name: 'Echart',
  components: {
    graphEchart
  },
  setup () {
    console.log('test')
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .graph-box {
    height: 100%;
    width: 100%;
  }
</style>
