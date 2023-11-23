<template>
  <div class="steam">
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { absDistance, randomArea } from './steam'
// import Circle from './Circle.ts'
export default defineComponent({
  name: 'Steam',
  setup () {
    const colors = ['orange', 'black', 'rgb(38,47,49)', 'rgb(222,235,242)', 'rgb(156,189,202)']
    const minRadius = 10
    const maxRadius = 50
    const moveInfo = {
      x: 0,
      y: 0,
      actualX: 0,
      actualY: 0
    }

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
          this.draw()
        }

        draw () {
          c.strokeStyle = 'white'
          c.fillStyle = this.color
          c.beginPath()
          c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
          c.fill()
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
    const drawCursor = (x: number, y: number) => {
      // c.clearRect(0, 0, 400, 600)
      // for (let i = 0; i < cirArr.length; i++) {
      //   cirArr[i].update()
      // }
          c.strokeStyle = 'white'
          c.fillStyle = 'red'
          c.beginPath()
          c.arc(x, y, 10, 0, Math.PI * 2, false)
          c.fill()
          c.stroke()
    }
    const initCanvas = () => {
      const parentDiv: HTMLDivElement = document.getElementsByClassName('steam')[0]
      const canvas: any = document.createElement('canvas')
      canvas.width = parentDiv.clientWidth
      canvas.height = parentDiv.clientHeight
      parentDiv.appendChild(canvas)
      c = canvas.getContext('2d')
      canvas.onmousemove = (e: any) => {
        console.log('move', e)
        console.log('w', canvas.offsetWidth)
        console.log('h', canvas.offsetHeight)
        const canvasX = e.x - canvas.offsetWidth
        const canvasY = e.y - canvas.offsetHeight
        console.log('canvasX', canvasX)
        console.log('canvasY', canvasY)
        drawCursor(canvasX, canvasY)
      }
    }
    const createCircles = () => {
      for (let i = 0; i < 1000; i++) {
        cirArr.push(new Cir(randomArea([10, 590]), randomArea([10, 490]), randomArea([1, 10]), Math.random() * 1, Math.random() * 1, colors[parseInt(Math.random() * (colors.length + 1) as any)]))
      }
    }
    onMounted(() => {
      initCanvas()
      createCircles()
    })
    return {
      cirArr,
      initCanvas,
      absDistance
    }
  }

})
</script>

<style lang="less">
  .steam {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
