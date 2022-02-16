<template>
  <div class="Tadpole">
    <h1>
      TadPole!!!!!!!!!!
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../../weapons/index'
import { message } from 'ant-design-vue'

export default defineComponent({
  name: 'Tadpole',
  setup () {
    onMounted(() => {
      log('This is Tad--Pole!!!')
    })
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.Tadpole {
  width: 100%;
  height: 100%;
  border: 1px solid green;
}

// html,
// body {
//     margin: 0;
//     overflow: hidden;
//     height: 100%;
// }

// /* Scale canvas with resize attribute to full size */
// canvas[resize] {
//     width: 100%;
//     height: 100%;
// }

</style>
