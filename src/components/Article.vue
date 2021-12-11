<template>
  <div class="Article">
    <a-form
     :model="formState"
     @validate="handleValidate"
     :label-col="labelCol"
     :wrapper-col="wrapperCol">
      <a-form-item label="文章标题">
        <a-input v-model:value="formState.title" />
      </a-form-item>
    <a-form-item label="文章内容">
      <a-textarea v-model:value="formState.content" style="height: 500px" />
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
import { defineComponent, PropType, reactive, toRaw } from 'vue'
import { PostProps } from '../dataFormat/dataFormat'
// import { Dayjs } from 'dayjs'

export default defineComponent({
  name: 'Article',
  setup () {
    const formState: PostProps = reactive({
      title: '',
      content: '',
      createAt: ''
    })
    const onSubmit = () => {
      console.log('submit!', toRaw(formState))
    }
    const handleValidate = (...args: any[]) => {
      console.log(args)
    }
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      formState,
      onSubmit,
      handleValidate
    }
  }
})
</script>

<style>
</style>
