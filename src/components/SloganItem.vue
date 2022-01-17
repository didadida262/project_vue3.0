<template>
  <div class="SloganItem">
    <div class="content">
      <span>{{ post.content}}</span>
    </div>
    <div class="time">
      <span>{{ post.createTime }}</span>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, PropType, reactive } from 'vue'
import { SloganProps } from '../dataFormat/dataFormat'

export default defineComponent({
  name: 'SloganItem',
  props: {
    data: {
      type: Object as PropType<SloganProps>,
      required: true
    }
  },
  setup (props) {
    const post = reactive(props.data)
    return {
      post
    }
  }
})
</script>

<style scoped lang="less">
  .SloganItem {
    border: 1px solid #ececec;
    box-shadow: 1px 1px 4px gray;
    height: 100px;
    margin-bottom: 20px;
    border-radius: 3px;
    background: #fff;transition: all .2s ease;
    padding: 30px;
    .content {
      height: 80%;
      font-size: 26px;
      display: flex;
      align-items: center;
    }
    .time {
      text-align: right;
      color: gray;
    }
  }
</style>
