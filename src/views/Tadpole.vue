<template>
  <div style="width:100px;border: 1px solid red">
    <h1>
      tad--pole
    </h1>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../weapons/index'
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
</style>