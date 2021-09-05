<template>
  <div class="validate-input-container pb-3">
    <label class="form-label">{{ $props.label }}</label>
    <input
      type="text"
      class="form-control"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      @blur="validateInput"
      @input="updateValue"
      v-bind="$attrs"
    >
    <span v-if="inputRef.error" class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import { emitter } from './validateForm.vue'
const emailReg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/g
interface RuleProp {
  type: 'required' | 'email';
  message: string;
}
export type RuleProps = RuleProp[]
export default defineComponent({
  name: 'ValidateInput',
  props: {
    rules: Array as PropType<RuleProps>,
    modelValue: String,
    label: String
  },
  setup (props) {
    const inputRef = reactive({
      label: props.label,
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      // context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allpassed = props.rules.every(rule => {
          let passed = true
          switch (rule.type) {
            case 'required':
              passed = inputRef.val.trim() !== ''
              inputRef.message = rule.message
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              inputRef.message = rule.message
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allpassed
        emitter.emit('inputInfo', { label: inputRef.label, val: inputRef.val })
        return allpassed
      }
      emitter.emit('inputInfo', { label: inputRef.label, val: inputRef.val })
      return true
    }

    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style>

</style>
