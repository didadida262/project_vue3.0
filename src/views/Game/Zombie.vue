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
    let frameObj = requestAnimationFrame(() => { log('kaishi') })
    class Ammunition {
      x: number;
      y: number;
      step: number;
      radius: number;
      constructor (x: number, y: number, step: number, radius: number) {
        this.x = x
        this.y = y
        this.step = step
        this.radius = radius
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
        // 如果越界，消除
        if (this.y <= 0) {
          log('1')
          ammuniRes.shift()
        } else {
          this.y -= this.step
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
    const drawRole = () => {
      // if (x === 0 || x === 400 || y === 0 || y === 800) return
      c.clearRect(0, 0, 400, 800)
      c.fillStyle = 'black'
      c.fillRect(role.x, role.y, 20, 20)
    }
    const drawShot = () => {
      cancelAnimationFrame(frameObj)
      // 射击动作
      c.clearRect(0, 0, 400, 800)
      drawRole()
      for (let i = 0; i < ammuniRes.length; i++) {
        ammuniRes[i].update()
      }
      frameObj = requestAnimationFrame(drawShot)
    }
    const roleAction = (action: string) => {
      // 获取任务坐标，执行对应行为
      // const people: any = document.getElementById('role')
      switch (action) {
        case 'up':
          role.diretion = 'up'
          role.y -= role.step
          drawRole()
          // people.style.top = Number(people.style.top.slice(0, -2)) - 10 + 'px'
          break
        case 'right':
          role.diretion = 'right'
          role.x += role.step
          drawRole()
          // people.style.left = Number(people.style.left.slice(0, -2)) + 10 + 'px'
          break
        case 'bottom':
          role.diretion = 'bottom'
          role.y += role.step
          drawRole()
          // people.style.top = Number(people.style.top.slice(0, -2)) + 10 + 'px'
          break
        case 'left':
          role.diretion = 'left'
          role.x -= role.step
          drawRole()
          break
        case 'shot':
          // eslint-disable-next-line no-case-declarations
          const am = new Ammunition(role.x + 10, role.y - 10, 3, 10)
          ammuniRes.push(am)
          drawShot()
      }
    }
    document.onkeydown = (e) => {
      const target = Number(e.which)
      switch (target) {
        case 37:
          roleAction('left')
          break
        case 38:
          roleAction('up')
          break
        case 39:
          roleAction('right')
          break
        case 40:
          roleAction('bottom')
          break
        case 32:
          roleAction('shot')
          break
      }
    }
    const initCanvas = () => {
      const canvas: any = document.getElementsByClassName('canvas')[0]
      c = canvas.getContext('2d')
      drawRole()
    }
    log('zombie')
    onMounted(() => {
      initCanvas()
    })
    return {
      initCanvas,
      drawRole,
      roleAction,
      drawShot,
      frameObj
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  @import '../../css/Zombie.less';
</style>
