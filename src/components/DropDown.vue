<template>
  <div class="dropdown" ref="dropdownRef">
    <a href="#" class="btn btn-outline-light my-2 dropdown-toggle" @click.prevent="toggle">{{ title }}!</a>
    <ul v-if="isOpen" class="dropdown-menu" :style="{display: 'block'}">
      <slot></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import useClickOutside from '../hooks/useClickOutside'
import { log } from '../weapons/index'

export default defineComponent({
  name: 'DropDown',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const isClickOutside = useClickOutside(dropdownRef)
    // 只执行一次
    log('isClickOutside111:', isClickOutside.value)
    watch(isClickOutside, () => {
      log('isClickOutside:', isClickOutside)
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    const toggle = () => {
      isOpen.value = !isOpen.value
    }
    return {
      isOpen,
      toggle,
      dropdownRef
    }
  }
})
</script>

<style>
.dropdown-menu {
    min-width: 8rem;
}
</style>
