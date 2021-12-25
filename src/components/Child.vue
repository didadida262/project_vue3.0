<template>
  <div class="Child">
    <h1>我是儿子</h1>
    <p>{{msg.name}}</p>
    <a-button @click="change">Click</a-button>
  </div>
  <hr>
  <div class="toDo">
    <h2>todo</h2>
    <form @submit.prevent="addTodo">
      <input
        type="text"
        placeholder="Enter a new task"
        v-model="task"
      />
    </form>
  </div>
  <hr>
  <p>{{ mutData }}</p>
  <a-button @click="testMut">c测试mut</a-button>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore, mapState, mapGetters } from 'vuex'
import { log } from '../weapons/index'
export default defineComponent({
  name: 'Child',
  props: {
    msg: {
      type: Object,
      required: true
    }
  },
  emits: ['getData'],
  setup (props, context) {
    const store = useStore()
    console.log('--->', store.getters.getUser)
    const task = ref('')
    console.log('child-->')
    const change = () => {
      const data = props.msg
      data.name += '+++'
      context.emit('getData', data)
    }
    const addTodo = (value: any) => {
      console.log('....', value)
      console.log('task.value:', task.value)
    }
    const testMut = () => {
      store.commit('testMut')
    }
    const mutData = computed(() => store.state.age)
    return {
      change,
      addTodo,
      task,
      testMut,
      mutData,
      store
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .Child {
    //
  }
</style>
