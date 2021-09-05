<template>
  <div class="test">
    <p>test</p>
    <div class="container"></div>

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
    // const xml = new XMLHttpRequest()
    // let showBlob = ''
    // let blob = ''
    // xml.open('GET', 'http://127.0.0.1:5000/testBlob', true)
    // xml.responseType = 'blob'
    // xml.send()
    // xml.onload = function (e) {
    //   if (this.status === 200) {
    //     blob = this.response
    //     showBlob = URL.createObjectURL(blob)
    //     const page: SelectProtected = document
    //     if (page) {
    //       page.getElementById('player').src = showBlob
    //     }
    //   }
    //   log('blob:', blob)
    //   log('showBlob:', showBlob)
    // }
    // return {
    //   blob,
    //   showBlob
    // }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .container{
        width:300px;
        height:600px;
        /* background:transparent url("../assets/avatar_null.png") no-repeat scroll -70px -40px; */
        /* background:transparent url("../assets/avatar_null.png") no-repeat scroll 10px 10px; */
        border:5px solid green;
    }
</style>
