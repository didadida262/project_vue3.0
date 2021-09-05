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
        if (Math.abs(this.x - moveInfo.actualX) < 5 && Math.abs(this.y - moveInfo.actualY) < 5) {
          this.radius += 10
        }
        this.draw()
      }
    }
    const cirArr = [] as any
    const randomArea = (arr: number[]) => {
      return Math.random() * (arr[1] - arr[0]) + arr[0]
    }
    for (let i = 0; i < 200; i++) {
      cirArr.push(new Cir(randomArea([10, 350]), randomArea([10, 510]), randomArea([1, 10]), Math.random() * 10, Math.random() * 10, colors[parseInt(Math.random() * (colors.length + 1) as any)]))
    }

    let x = 10
    let y = 10
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

      log('++++++++++++++++++++++')
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
      log(canvas.getBoundingClientRect())

      c = canvas.getContext('2d')
      // drawR(x, y)
      canvas.onmousemove = (e: any) => {
        // log('111', canvas.getBoundingClientRect())
        moveInfo.x = e.x
        moveInfo.y = e.y
        moveInfo.actualX = moveInfo.x - canvas.getBoundingClientRect().left
        moveInfo.actualY = moveInfo.y - canvas.getBoundingClientRect().top
      }
      drawCircle()
    }
    const movePerson = (action: string) => {
      // 获取任务坐标，执行对应行为
      // const people: any = document.getElementById('role')
      switch (action) {
        case 'up':
          drawR(x, y -= d)
          // people.style.top = Number(people.style.top.slice(0, -2)) - 10 + 'px'
          break
        case 'right':
          drawR(x += d, y)
          // people.style.left = Number(people.style.left.slice(0, -2)) + 10 + 'px'
          break
        case 'bottom':
          drawR(x, y += d)
          // people.style.top = Number(people.style.top.slice(0, -2)) + 10 + 'px'
          break
        case 'left':
          drawR(x -= d, y)
          // people.style.left = Number(people.style.left.slice(0, -2)) - 10 + 'px'
      }
      // log('-------people----:', people)
      // log('clientHeight:', people.clientHeight)
      // log('clientWidth:', people.clientWidth)
      // log('-------action----:', action)
      // log('people.style.left:', people.style.left)
    }
    document.onkeydown = (e) => {
      log('--key-----:', e.which)
      const target = Number(e.which)
      switch (target) {
        case 37:
          movePerson('left')
          break
        case 38:
          movePerson('up')
          break
        case 39:
          movePerson('right')
          break
        case 40:
          movePerson('bottom')
          break
      }
    }
    onMounted(() => {
      initCanvas()
    })
    return {
      person,
      cirArr,
      initCanvas,
      drawR,
      drawCircle
    }
  }

})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../css/Steam.less';
</style>
