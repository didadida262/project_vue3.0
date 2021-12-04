<template>
  <a-result status="403" title="404" sub-title="Sorry, you are not authorized to access this page.">
    <template #extra>
      <a-button type="primary" @click="goBack">Back Home</a-button>
    </template>
  </a-result>
</template>

<script lang='ts'>

import { defineComponent } from 'vue'
import router from '../router/router'
interface FormState {
  name: string;
  password: string;
}
export default defineComponent({

  name: 'Notfound',
  setup () {
    console.log('Notfound')
    const goBack = () => {
      router.push('/home')
    }
    return {
      goBack
    }
  }
})
</script>

<style>
</style>
