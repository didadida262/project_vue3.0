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

export default defineComponent({
  name: 'Diary',
  components: {
    ArticelItem
  },
  setup () {
    const testData: PostProps = {
      id: 1,
      title: '测试',
      content: '。。。。。',
      image: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3188373350,4259650546&fm=26&gp=0.jpg',
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
