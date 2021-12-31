import { ref, onMounted, onUnmounted, Ref } from 'vue'

const useClickOutside = (dropdownRef: Ref<null | HTMLElement>) => {
  const isClickOutside = ref(false)
  const handleToggle = (e: MouseEvent) => {
    if (dropdownRef.value) {
      if (!dropdownRef.value.contains(e.target as HTMLElement)) {
        isClickOutside.value = true
      } else {
        isClickOutside.value = false
      }
    }
  }
  onMounted(() => {
    console.log('hook加载成功')
    document.addEventListener('click', handleToggle)
  })
  onUnmounted(() => {
    console.log('hook卸载成功')
    document.removeEventListener('click', handleToggle)
  })
  return isClickOutside
}

export default useClickOutside
