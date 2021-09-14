<template>
  <div class="test">
    <p>test</p>
    <div class="divone"></div>
    <div class="divtwo"></div>

    <!-- <video src="" id="player"></video>
    <p>{{ blob }}</p>
    <p>{{ showBlob }}</p> -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
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
    log(1)
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
