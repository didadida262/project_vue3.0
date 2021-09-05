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
export default defineComponent({
  name: 'Steam',
  setup () {
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
      constructor (x: number, y: number, radius: number, dx: number, dy: number) {
        this.x = x
        this.y = y
        this.radius = radius
        this.dx = dx
        this.dy = dy
      }

      draw () {
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.strokeStyle = 'green'
        c.stroke()
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
        this.draw()
      }
    }
    const cirArr = [] as any
    for (let i = 0; i < 200; i++) {
      cirArr.push(new Cir(Math.random() * 360, Math.random() * 520, 10, Math.random() * 5, Math.random() * 5))
    }
    let x = 10
    let y = 10
    const d = 10
    // function Circle (this: any, x: number, y: number, radius: number, dx: number, dy: number, c: any) {
    //   this.x = x
    //   this.y = y
    //   this.radius = radius
    //   this.dx = dx
    //   this.dy = dy
    //   this.draw = function () {
    //     c.beginPath()
    //     c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
    //     c.strokeStyle = 'blue'
    //     c.stroke()
    //   }
    //   this.update = function () {
    //     if (this.x + this.radius > 360 || this.x - this.radius < 0) {
    //       this.dx = -this.dx
    //     }
    //     if (this.y + this.radius > 520 || this.y - this.radius < 0) {
    //       this.dy = -this.dy
    //     }
    //     this.x += this.dx
    //     this.y += this.dy
    //   }
    // }
    const drawR = (x: number, y: number) => {
      c.clearRect(0, 0, 360, 520)
      c.fillRect(x, y, 20, 20)
      c.strokeStyle = 'black'
      c.stroke()
    }
    const test = new Cir(10, 10, 10, 1, 1)
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
      drawR(x, y)
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
