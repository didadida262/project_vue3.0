<template>
  <div class="zombie">
    <!-- 僵尸 -->
    <h1>Zombie</h1>
    <canvas class="canvas" width="400" height="800"></canvas>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive } from 'vue'
import { log } from '../../weapons/index'
interface Role {
  name: string;
  x: number;
  y: number;
  step: number;
  blood: number;
  diretion: string;
}

export default defineComponent({
  name: 'Zombie',
  setup () {
    const ammuniRes = [] as any
    let c: CanvasRenderingContext2D
    class Ammunition {
      x: number;
      y: number;
      step: number;
      radius: number;
      index: number;
      constructor (x: number, y: number, step: number, radius: number, index: number) {
        this.x = x
        this.y = y
        this.step = step
        this.radius = radius
        this.index = index
      }

      draw () {
        c.strokeStyle = 'white'
        c.fillStyle = 'red'
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        c.stroke()
        c.fill()
      }

      update () {
        this.y -= this.step
        // 如果越界，消除
        if (this.y <= 0) {
          log('1')
          ammuniRes.splice(this.index, 1)
        } else {
          log('2')
          this.draw()
        }
      }
    }
    const role: Role = {
      name: 'hhvcg',
      x: 200,
      y: 400,
      step: 10,
      blood: 100,
      diretion: ''
    }
    // let test = new Ammunition(role.x + 10, role.y - 10, 3, 10)
    const drawRole = (x: number, y: number) => {
      // if (x === 0 || x === 400 || y === 0 || y === 800) return
      c.clearRect(0, 0, 400, 800)
      c.fillStyle = 'black'
      c.fillRect(x, y, 20, 20)
    }
    const drawShot = () => {
      // 射击动作
      requestAnimationFrame(drawShot)
      c.clearRect(0, 0, 400, role.y)
      for (let i = 0; i < ammuniRes.length; i++) {
        ammuniRes[i].update()
      }
      log('ammuniRes', ammuniRes.length)
      log('=====================')
    }
    const movePerson = (action: string) => {
      // 获取任务坐标，执行对应行为
      // const people: any = document.getElementById('role')
      switch (action) {
        case 'up':
          role.diretion = 'up'
          drawRole(role.x, role.y -= role.step)
          // people.style.top = Number(people.style.top.slice(0, -2)) - 10 + 'px'
          break
        case 'right':
          role.diretion = 'right'
          drawRole(role.x += role.step, role.y)
          // people.style.left = Number(people.style.left.slice(0, -2)) + 10 + 'px'
          break
        case 'bottom':
          role.diretion = 'bottom'
          drawRole(role.x, role.y += role.step)
          // people.style.top = Number(people.style.top.slice(0, -2)) + 10 + 'px'
          break
        case 'left':
          role.diretion = 'left'
          drawRole(role.x -= role.step, role.y)
          break
        case 'shot':
          // eslint-disable-next-line no-case-declarations
          const am = new Ammunition(role.x + 10, role.y - 10, 3, 10, ammuniRes.length)
          ammuniRes.push(am)
          drawShot()
      }
    }
    document.onkeydown = (e) => {
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
        case 32:
          movePerson('shot')
          break
      }
    }
    const initCanvas = () => {
      const canvas: any = document.getElementsByClassName('canvas')[0]
      c = canvas.getContext('2d')
      drawRole(role.x, role.y)
    }
    log('zombie')
    onMounted(() => {
      initCanvas()
    })
    return {
      initCanvas,
      drawRole,
      movePerson,
      drawShot
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../css/Zombie.less';
</style>
