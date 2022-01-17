<template>
  <div class="Slogan">
    <a-button type='primary'>新增</a-button>
     <a-divider>All-Data</a-divider>
    <slogan-item :data='testData'></slogan-item>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { SloganProps } from '../dataFormat/dataFormat'
import SloganItem from '../components/SloganItem.vue'

export default defineComponent({
  name: 'Slogan',
  components: {
    SloganItem
  },
  setup () {
    const testData: SloganProps = {
      content: '我不问你信不信，我只问你服不服！！',
      createTime: '2021/3/18'
    }
    return {
      testData
    }
  }
})
</script>

<style>

</style>
