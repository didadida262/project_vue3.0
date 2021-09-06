<template>
  <div class="steam">
    <!-- 僵尸 -->
    <!-- <div id="role"> </div> -->
    <canvas width="360" height="520"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { log } from '../../weapons/index'
interface Role {
  name: string;
  blood: number;
}
interface Point {
  x: number;
  y: number;
  actualX: number;
  actualY: number;
}
export default defineComponent({
  name: 'Steam',
  setup () {
    const colors = ['orange', 'black', 'rgb(38,47,49)', 'rgb(222,235,242)', 'rgb(156,189,202)']
    const minRadius = 10
    const maxRadius = 50
    const moveInfo: Point = {
      x: 0,
      y: 0,
      actualX: 0,
      actualY: 0
    }
    const person: Role = reactive({
      name: 'tony',
      blood: 100
    })
    let c: CanvasRenderingContext2D
    // 计算绝对距离
    const absDistance = (pointOne: number[], pointTwo: number[]) => {
      return Math.sqrt(Math.pow(pointTwo[0] - pointOne[0], 2) + Math.pow(pointTwo[1] - pointOne[1], 2))
    }
    const randomArea = (arr: number[]) => {
      return Math.random() * (arr[1] - arr[0]) + arr[0]
    }
    class Cir {
      x: number;
      y: number;
      radius: number;
      dx: number;
      dy: number;
      color: string;
      constructor (x: number, y: number, radius: number, dx: number, dy: number, color: string) {
        this.x = x
        this.y = y
        this.radius = radius
        this.dx = dx
        this.dy = dy
        this.color = color
      }

      draw () {
        c.strokeStyle = 'white'
        c.fillStyle = this.color
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.stroke()
        c.fill()
      }

      update () {
        if (this.x + this.radius > 360 || this.x - this.radius < 0) {
          this.dx = -this.dx
        }
        if (this.y + this.radius > 520 || this.y - this.radius < 0) {
          this.dy = -this.dy
        }
        this.x += this.dx
        this.y += this.dy
        // if (Math.abs(this.x - moveInfo.actualX) < 5 && Math.abs(this.y - moveInfo.actualY) < 5) {
        if (absDistance([this.x, this.y], [moveInfo.actualX, moveInfo.actualY]) < this.radius) {
          if (this.radius < maxRadius) {
            this.radius += 3
          }
        } else if (this.radius > minRadius) {
          this.radius -= 3
        }
        this.draw()
      }
    }
    const cirArr = [] as any

    for (let i = 0; i < 500; i++) {
      // 随机半径
      cirArr.push(new Cir(randomArea([10, 350]), randomArea([10, 510]), randomArea([1, 10]), Math.random() * 1, Math.random() * 1, colors[parseInt(Math.random() * (colors.length + 1) as any)]))
      // 半径加速度写死
      // cirArr.push(new Cir(randomArea([10, 350]), randomArea([10, 510]), 5, 2, 2, colors[parseInt(Math.random() * (colors.length + 1) as any)]))
    }

    const x = 10
    const y = 10
    const d = 10
    const drawR = (x: number, y: number) => {
      c.clearRect(0, 0, 360, 520)
      // fillRect绘制有填充色的矩形
      c.fillStyle = 'black'
      c.strokeStyle = 'red'
      c.fillRect(x, y, 20, 20)
      // strokeRect绘制有边框色的矩形框
      // c.strokeStyle = 'red'
      // c.strokeRect(x + 100, y + 100, 20, 20)

      // c.stroke()
    }
    const drawCircle = () => {
      // do something
      requestAnimationFrame(drawCircle)
      c.clearRect(0, 0, 360, 520)
      for (let i = 0; i < cirArr.length; i++) {
        cirArr[i].update()
      }
    }
    const initCanvas = () => {
      const canvas: any = document.querySelector('canvas')
      c = canvas.getContext('2d')
      // drawR(x, y)
      canvas.onmousemove = (e: any) => {
        log('move')
        // log('111', canvas.getBoundingClientRect())
        moveInfo.x = e.x
        moveInfo.y = e.y
        moveInfo.actualX = moveInfo.x - canvas.getBoundingClientRect().left
        moveInfo.actualY = moveInfo.y - canvas.getBoundingClientRect().top
      }
      drawCircle()
    }
    onMounted(() => {
      initCanvas()
    })
    return {
      person,
      cirArr,
      initCanvas,
      drawR,
      drawCircle,
      absDistance
    }
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../css/Steam.less';
</style>
