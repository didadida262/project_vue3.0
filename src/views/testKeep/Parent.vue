<template>
  <div class="Parent">
    parent
  </div>
  <child :data='data'/>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../../weapons/index'
import Child from './Child.vue'
import { getData } from '@/api/common'

export default defineComponent({
  name: 'Parent',
  components: {
    Child
  },
  setup () {
    console.log('parent-->')
    let data = '测试'
    getData().then((res: any) => {
      data = res
    })
    return {
      data
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
