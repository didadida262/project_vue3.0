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
  <div class="progess">
      <div class="bar"></div>
  </div>
  <div class="cir">
  </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log } from '../weapons/index'
import bus from './Bus'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { uploadFile, getImg } from '@/api/common'
import { _arrayBufferToBase64 } from '@/utils/utils'

interface SelectProtected {
    readonly wrapperElement: HTMLDivElement;
    readonly videoElement: HTMLVideoElement;
}
interface FileItem {
  uid: string;
  name?: string;
  status?: string;
  response?: string;
  url?: string;
}

interface FileInfo {
  file: FileItem;
  fileList: FileItem[];
}
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
}
export default defineComponent({
  name: 'TestPage',
  setup () {
    const imgurl = ref('')
    const fileList = ref([])
    const f = function () {
      let timer = null as any
      return function () {
        clearTimeout(timer)
        timer = setTimeout(() => {
          console.log('click')
        }, 1000)
      }
    }
    const handleChange = (info: FileInfo) => {
      if (info.file.status !== 'uploading') {
        console.log('uploading', info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    }
    const debounce = f()
    const test = () => {
      console.log('imgurl.value:', imgurl.value)
      window.location.href = imgurl.value
    }
    const upload = (file: any) => {
      const params = new FormData()
      console.log('file1:', file)
      params.append('file', file.file)
      console.log('file--->:', params.get('file'))
      uploadFile(params).then((res) => {
        // message.success(`${res}`)
        getImg().then((res) => {
          console.log('tupian1-->:', res)
          let url = 'data:image/jpeg;base64,'
          url = url + _arrayBufferToBase64(res)
          console.log('tupian2-->:', url)
          imgurl.value = url
          console.log('tupian3-->', imgurl)
        })
      })
    }
    return {
      debounce,
      fileList,
      handleChange,
      upload,
      imgurl,
      test
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .cir {
    width: 200px;
    height: 200px;
    border-top: 20px solid black;
    border-radius: 50%;
    // display: flex;
    // justify-content: center;
    // align-items: center;
  }
  .progess {
    width: 500px;
    height: 38px;
    border: 1px solid red;
    .bar {
      background-color: green;
      height: 100%;
      animation: p 10s infinite;
    }
  }
  @keyframes p {
    from {
      width: 0%;
    }
    to {
      width: 100%;
    }
  }
  .box1 {
    width: 5px;
    height: 5px;
    background: red;
    border-radius: 50%;
    animation: first 1.3s linear infinite;
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
