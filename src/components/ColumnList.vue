<template>
  <div class="row">
    <div v-for="column in list" :key="column.id" class="col-4 card h-100 shadow-sm mb-4">
      <div class="card-body text-center">
        <img :src="column.avatar" class="rounded-circle border border-light w-25 my-3" alt="...">
        <h5 class="card-title">{{column.title}}</h5>
        <p class="card-text text-left">{{column.description}}</p>
        <a href="#" class="btn btn-outline-primary">进入专栏</a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface ColumnProps {
    id: number;
    title: string;
    avatar?: string;
    description: string;
}

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = props.list.map(column => {
      if (column.avatar === '') {
        column.avatar = require('@/assets/avatar_null.png')
      }
      return column
    })
    return columnList
  }
})
</script>

<style>

</style>
