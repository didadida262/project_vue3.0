<!--
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:13:14
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="Diary">
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
    <articel-item :data="testData"></articel-item>
  </div>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import ArticelItem from '../components/ArticleItem.vue'
import { PostProps } from '../dataFormat/dataFormat'
import { getTestImg } from '@/api/common'

export default defineComponent({
  name: 'Diary',
  components: {
    ArticelItem
  },
  async setup () {
    let testImg = ''
    await getTestImg()
    .then((res: any) => {
      const blob = new Blob([res], { type: 'jpg' })
      testImg = URL.createObjectURL(blob)
    })
    const testData: PostProps = {
      id: 1,
      title: '测试',
      content: '。。。。。',
      image: testImg,
      createAt: '2021/3/18',
      columnId: 1
    }
    return {
      testData
    }
  }
})
</script>

<style>

</style>
