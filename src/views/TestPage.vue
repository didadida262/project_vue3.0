<template>
  <div class="test">
    <p>test</p>
    <a-button @click="debounce">click</a-button>
<a-descriptions title="User Info" bordered>
    <a-descriptions-item label="Product">
      Cloud Database
    </a-descriptions-item>
    <a-descriptions-item label="Billing Mode">
      Prepaid
    </a-descriptions-item>
    <a-descriptions-item label="Automatic Renewal">
      YES
    </a-descriptions-item>
    <a-descriptions-item label="Order time">
      2018-04-24 18:00:00
    </a-descriptions-item>
    <a-descriptions-item label="Usage Time" :span="2">
      2019-04-24 18:00:00
    </a-descriptions-item>
    <a-descriptions-item label="Status" :span="3">
      <a-badge status="processing" text="Running" />
    </a-descriptions-item>
    <a-descriptions-item label="Negotiated Amount">
      $80.00
    </a-descriptions-item>
    <a-descriptions-item label="Discount">
      $20.00
    </a-descriptions-item>
    <a-descriptions-item label="Official Receipts">
      $60.00
    </a-descriptions-item>
    <a-descriptions-item label="Config Info">
      Data disk type: MongoDB
      <br />
      Database version: 3.4
      <br />
      Package: dds.mongo.mid
      <br />
      Storage space: 10 GB
      <br />
      Replication factor: 3
      <br />
      Region: East China 1<br />
    </a-descriptions-item>
  </a-descriptions>
  <div class="box1"></div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log, change } from '../weapons/index'
import bus from './Bus'
interface SelectProtected {
    readonly wrapperElement: HTMLDivElement;
    readonly videoElement: HTMLVideoElement;
}
// import { commonAPI } from '../api/common'
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default defineComponent({
  name: 'TestPage',
  setup () {
    bus.$on('change', (data: any) => {
      alert(data)
    })
    const obj = {
      name: 'hhvcg'
    }
    change(obj)
    console.log('obj:', obj)
    const f = function () {
      let timer = null as any
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('click')
        }, 1000)
      }
    }
    const debounce = f()
    return {
      debounce
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box1 {
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    animation: first 0.3s linear infinite;
  }
  .box2 {
      animation-delay: -1.1s;
  }
  .box3 {
    animation-delay: -.9s
  }
  @keyframes first {
      0% {
          transform: scale(1.0);
      }
      60% {
          transform: scale(1.3);
          opacity: 0.5;
      }
      100% {
          transform: scale(1);
          opacity: 1;
      }
  }

</style>
