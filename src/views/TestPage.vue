<template>
  <div @click="c1" style="width:100px;border: 1px solid red">
    <div @click="c2">
      <div @click="c3">时间顺序测试</div>
    </div>
  </div>
  <div class="test">
    <p>{{ watchDate }}</p>
    <a-button @click="test">click</a-button>
    <div class="box1"></div>
    <div class="progess">
        <div class="bar"></div>
    </div>
    <div class="cir">
    </div>
    <div class="squre">
      <div class="insider"></div>
    </div>

    <div ref="ul" class="test-url">
      <a-button @click="addChildren">add</a-button>
      <ul>
        <li>1</li>
        <li>2</li>
        <li>3</li>
      </ul>
    </div>
  </div>
  <div>
    <a-input></a-input>
    <a-button @click="generateQ">一键生成</a-button>
    <canvas id="canvas"></canvas>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, toRefs, watch, onMounted } from 'vue'
import { useStore } from 'vuex'
// import { useStore } from '@/vuex/index'
import { log } from '../weapons/index'
import bus from './Bus'
import { message } from 'ant-design-vue'
import { UploadOutlined } from '@ant-design/icons-vue'
import { uploadFile, getImg } from '@/api/common'
import { _arrayBufferToBase64 } from '@/utils/utils'
import QRCode from 'qrcode'

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
    const generateQ = () => {
      console.log('生成q')
      const qrcode = new QRCode(document.getElementById('canvas'), {
        // text: document.getElementById("input").value,
        text: 'sssss',
        width: 200,
        height: 200,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode?.CorrectLevel?.H
      })
    }
    const imgurl = ref('')
    const fileList = ref([])
    const watchDate = ref(1)
    const test = () => {
      console.log('change')
    }
    watch(watchDate, () => {
      log('值变化')
    })
    const tx = computed(() => {
      return watchDate.value + 1
    })
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
    const ul = ref([])
    const addChildren = () => {
      console.log('add!')
      console.log('ul:', ul.value)
    }
    const c1 = () => {
      console.log(1)
    }
    const c2 = () => {
      console.log(2)
    }
    const c3 = () => {
      console.log(3)
    }
    return {
      c1,
      c3,
      c2,
      fileList,
      handleChange,
      upload,
      imgurl,
      test,
      watchDate,
      tx,
      addChildren,
      ul,
      generateQ
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

.squre {
  width: 300px;
  height: 300px;
  border: 1px solid gray;
  position: relative;
  .insider {
    background-color: red;

  }
}
.squre:hover {
  // 一方向
  // .insider {
  //   width: 100%;
  //   height: 5px;
  //   transform-origin: left;
  //   animation: 3s slidein linear;
  // }
  // 二方向
  // .insider {
  //   width: 5px;
  //   height: 100%;
  //   position: absolute;
  //   right: 0px;
  //   animation: 3s slidiny linear;
  //   transform-origin: top;
  // }
  // 三方向
  // .insider {
  //   width: 100%;
  //   height: 5px;
  //   position: absolute;
  //   bottom: 0px;
  //   transform-origin: right;
  //   animation: 3s slidein linear;
  // }
  // 四方向
  .insider {
    width: 5px;
    height: 100%;
    transform-origin: bottom;
    background-color: red;
    animation: 3s slidiny linear;
  }
}
@keyframes slidein {
  from {
    transform: scaleX(0);
   }
  to   {
    transform: scaleX(1);
  }
}
@keyframes slidiny {
  from {
    transform: scaleY(0);
   }
  to   {
    transform: scaleY(1);
  }
}

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
  .test-url {
    border: 1px solid red;
    width: 100px;
  }

</style>
