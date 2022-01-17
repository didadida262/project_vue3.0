<template>
  <div class="Parent">
    <div class="box">
      <div class="slide-con">
        <ul class="slide">
          <!-- <li><a href="#"><img src="../assets/imgs/t1.png" alt="huan"></a></li> -->
          <!-- <li><a href="#"><img src="@/assets/imgs/t2.png" alt="huan"></a></li>
          <li><a href="#"><img src="@/assets/imgs/t3.png" alt="huan"></a></li>
          <li><a href="#"><img src="@/assets/imgs/t4.png" alt="huan"></a></li> -->
        </ul>
        <ul class="points">
        </ul>
      </div>
      <!-- <div class="prev"><img src="@/assets/imgs/timg2.png" alt=""></div>
      <div class="next"><img src="@/assets/imgs/timg2.png" alt=""></div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../weapons/index'

export default defineComponent({
  name: 'Parent',
  setup () {
    console.log('parent-->')

    return {
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  // .Parent {
  //   //
  // }
</style>
