<template>
  <div class="music">
    <p>music</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log } from '../weapons/index'

// import { commonAPI } from '../api/common'

export default defineComponent({
  name: 'Music',
  setup () {
    log('music')
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
