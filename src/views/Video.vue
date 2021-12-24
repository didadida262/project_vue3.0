<template>
  <div class="Video">
    <div class="videoo">
      <div>
        <video controls width="1000" id="video" ref="videoRef">
            <source src="/media/cc0-videos/flower.webm"
                    type="video/webm">
            <source src="/media/cc0-videos/flower.mp4"
                    type="video/mp4">
            Sorry, your browser doesn't support embedded videos.
        </video>
      </div>
      <div class="img">
        <canvas ref="canvasRef" width="300" height="200"></canvas>
      </div>
    </div>
    <div class="control">
      <button class="btn btn-success mb-3" @click="photograph">截图</button>
      <button class="btn btn-success mb-3" style="margin-left: 10px" @click="download">下载</button>
      <button class="btn btn-success mb-3" style="margin-left: 10px">录像</button>
      <button class="btn btn-success mb-3" style="margin-left: 10px" @click="sendImage">发送图片</button>
    </div>
  </div>
</template>

<script lang='ts'>
import { defineComponent, ref, onMounted } from 'vue'
import { sendPic } from '../api/common'

export default defineComponent({
  name: 'Video',
  setup () {
    let imgSrc = ''
    const canvasRef = ref<null | HTMLElement>(null) as any
    const videoRef = ref<null | HTMLElement>(null) as any
    let ctx = canvasRef.value?.getContext('2d')
    const constraints = { audio: true, video: { width: 300, height: 200 } }
    const test = navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
      console.log('stream:', stream)
      /* 使用这个stream stream */
      const video = document.querySelector('video') as any
      video.srcObject = stream
      video.onloadedmetadata = (e: any) => {
        video.play()
      }
    }).catch((err) => {
      console.log('err:', err)
    })

    const photograph = () => {
      ctx = canvasRef.value.getContext('2d')
      // 把当前视频帧内容渲染到canvas上
      ctx.drawImage(videoRef.value, 0, 0, 300, 200)
      // // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
      const imgBase64 = canvasRef.value.toDataURL('image/jpeg', 0.7)
      // 由字节转换为KB 判断大小
      const str = imgBase64.replace('data:image/jpeg;base64,', '')
      imgSrc = str
    }
    const download = () => {
      // let strLength = str.length;
      // let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
      // let size = (fileLength / 1024).toFixed(2);
      // console.log(size); // 上传拍照信息  调用接口上传图片 .........
      // 保存到本地
      const ADOM = document.createElement('a')
      ADOM.href = imgSrc
      ADOM.download = new Date().getTime() + '.jpeg'
      console.log('adom:', ADOM)
      ADOM.click()
    }
    const sendImage = () => {
      console.log('发送图片:', imgSrc)
      sendPic(imgSrc)
        .then((res) => {
          console.log('反馈：', res)
        })
    }
    return {
      test,
      photograph,
      canvasRef,
      videoRef,
      ctx,
      download,
      sendImage,
      imgSrc
    }
  }
})
</script>

<style>
  .Video {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

</style>
