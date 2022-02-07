<template>
  <div class="Child">
    child
  </div>
  <span>{{ data }}</span>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../../weapons/index'

export default defineComponent({
  name: 'Child',
  props: {
    data: {
      type: String,
      required: true
    }
  },
  setup (props) {
    console.log('child-->:', props.data)
    const show = ref(props.data)
    watch(props.data, (newV, oldV) => {
      console.log('newV:', newV)
      console.log('oldV:', oldV)
    })
    return {
      show
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
