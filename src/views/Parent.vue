<template>
  <div class="Parent">
    Parent
    <p>{{ user.name }}</p>
    <p>{{ user.cars }}</p>
    <Child :msg="user" @getData="getData"></Child>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
import { log } from '../weapons/index'
import Child from '../components/Child.vue'

export default defineComponent({
  name: 'Parent',
  components: {
    Child
  },
  setup () {
    console.log('parent-->')
    const user = reactive({
      name: 'hhvcg',
      cars: ['兰博基尼', '本田思域']
    })
    const getData = (userInfo: object) => {
      console.log('儿子的值：', userInfo)
    }
    return {
      user,
      getData
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
