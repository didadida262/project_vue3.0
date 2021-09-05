<template>
  <div class="ArticelItem">
    <div class="img">
      <img :src="post.image" alt="" width="188" height="120">
    </div>
    <div class="content">
      <h3>{{ post.title }}</h3>
      <p>{{ post.content }}</p>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive } from 'vue'
import { PostProps } from '../dataFormat/dataFormat'

export default defineComponent({
  name: 'ArticelItem',
  props: {
    data: {
      type: Object as PropType<PostProps>,
      required: true
    }
  },
  setup (props) {
    const post = reactive(props.data)
    console.log(post)
    return {
      post
    }
  }
})
</script>

<style>
  .ArticelItem {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 190px;
    margin-bottom: 20px;
    border-radius: 6px;
    background: #fff;transition: all .2s ease;
    padding: 30px;
  }
  .ArticelItem .content {
    flex: 1;
    margin-left: 20px;
  }
</style>
