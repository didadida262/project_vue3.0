<template>
  <div class="Article">
    <a-form
      ref="formRef"
     :model="formState"
     :label-col="labelCol"
     :rules="rules"
     :wrapper-col="wrapperCol">
      <a-form-item label="文章标题" name="title">
        <a-input v-model:value="formState.title" />
      </a-form-item>
    <a-form-item label="文章内容">
      <a-textarea v-model:value="formState.content" style="height: 300px" />
    </a-form-item>
      <a-form-item label="创建时间">
        <a-date-picker
          v-model:value="formState.createAt"
          show-time
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
        <a-button type="primary" @click="onSubmit">Create</a-button>
        <a-button style="margin-left: 10px">Cancel</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive, toRaw, ref } from 'vue'
import { PostProps } from '../dataFormat/dataFormat'
import { message } from 'ant-design-vue'
// import { Dayjs } from 'dayjs'
import type { UnwrapRef } from 'vue'
export default defineComponent({
  name: 'Article',
  setup () {
    const formRef = ref()
    const formState: UnwrapRef<PostProps> = reactive({
      title: '',
      content: '',
      createAt: ''
    })
   const resetForm = () => {
      // formState.value.resetFields()
    }
    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
      formRef.value
        .validate()
        .then(() => {
          console.log('values', formState, toRaw(formState))
        })
        .catch((error: any) => {
          message.error(
          `This is a prompt message for success, and it will disappear in 10 seconds${error}`,
          10
        )
        })
    }
    const rules = {
      title: [
        { required: true, message: 'Please input article name', trigger: 'blur' },
        { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
      ]
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      rules,
      resetForm,
      formRef
    }
  }
})
</script>

<style>
</style>
