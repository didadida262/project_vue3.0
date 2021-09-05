<template>
  <form action="">
    <slot name="default"></slot>
    <div class="submit-area" @click.prevent="submitAll">
      <slot name="submit">
        <button type="submit" class="btn btn-dark">登录</button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import { defineComponent, onUnmounted } from 'vue'
import mitt from 'mitt'

export const emitter = mitt()
export default defineComponent({
  emits: ['form-submit'],
  name: 'ValidateForm',
  setup (props, context) {
    const userInfo = {
      userName: '',
      userPd: ''
    } as any
    const submitAll = () => {
      context.emit('form-submit', userInfo)
    }
    const callback = (result: any) => {
      userInfo[result.label] = result.val
    }
    emitter.on('inputInfo', callback)
    onUnmounted(() => {
      emitter.off('inputInfo', callback)
    })
    return {
      submitAll
    }
  }
})
</script>

<style>

</style>
