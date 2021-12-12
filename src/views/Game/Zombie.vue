<template>
  <div class="zombie">
    <h1 class="game-title-st">Zombie</h1>
    <!-- 僵尸 -->
    <div class="info">
      <span class="font-st">炮手: {{ name }}</span>
      <span class="font-st">得分: {{ score }}</span>
      <span class="font-st">血量: {{ blood }}</span>
      <a-divider/>
    </div>
    <div class="canvasDiv">
      <canvas class="canvasRole" width="400" height="600"></canvas>
      <canvas class="canvasBackg" width="400" height="600"></canvas>
    </div>
    <a-button @click="changeWeapon" style="margin: 10px auto;display: block">切换武器</a-button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, reactive, toRefs, onRenderTracked, onRenderTriggered, toRef } from 'vue'
import { log } from '../../weapons/index'
import { getImg } from '@/api/common'
import { _arrayBufferToBase64 } from '@/utils/utils'
import { Role } from './game_utils'

export default defineComponent({
  name: 'Zombie',
  setup () {
    const WIDTH = 400
    const HEIGHT = 600
    // 游戏地图
    const img = new Image()
    getImg().then((res) => {
      let url = 'data:image/jpeg;base64,'
      url = url + _arrayBufferToBase64(res)
      img.src = url
      // 加载背景图
      img.onload = () => {
        log('picture_ready!!!')
      }
    })
    let weaponCir = Math.PI * 2
    let cRole: CanvasRenderingContext2D
    // 第二块画布
    let cAmmun: CanvasRenderingContext2D
    const drawBckg = () => {
      // cAmmun.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);]
      cAmmun.drawImage(img, 0, 0, 400, 600)
    }

    const npcFire = () => {
      log('fire')
    }
    const npc: Role = {
      name: 'Satein',
      x: 200,
      y: 200,
      step: 10,
      score: 0,
      blood: 100,
      direction: ''
    }
    const role: Role = reactive({
      name: '空军一号',
      x: 100,
      y: 400,
      step: 10,
      score: 0,
      blood: 100,
      direction: 'up'
    })
    // 绘制npc
    const drawNpc = () => {
      cRole.fillStyle = 'green'
      cRole.fillRect(npc.x, npc.y, 20, 20)
    }
    // 命中npc
    const shutDown = () => {
      npc.x = Math.random() * 380
      npc.y = Math.random() * 580
      role.score += 1
      log('role:', role)
      drawNpc()
    }
    // 弹药库
    const ammuniResp: Ammunition[] = []
    // npc弹药
    const npcAmmuniResp: Array<Ammunition> = []
    class Ammunition {
      // 弹药坐标
      x: number;
      y: number;
      // 弹药移动速度
      step: number;
      // ...大小
      radius: number;
      // 运动方向
      direction: string;
      constructor (x: number, y: number, radius: number, step: number, direction: string) {
        this.x = x
        this.y = y
        this.step = step
        this.radius = radius
        this.direction = direction
      }
      // 根据当前弹药对象的基本数据，绘制操作

      draw () {
        cRole.strokeStyle = 'white'
        cRole.fillStyle = 'gray'
        cRole.beginPath()
        // cRole.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
        cRole.arc(this.x, this.y, this.radius, 0, weaponCir, false)
        cRole.stroke()
        cRole.fill()
      }

      // 让弹药以设定速度往人物方向运动
      update () {
        // 如果越界，消除
        if (this.y - this.radius < 0 || this.y + this.radius > HEIGHT || this.x - this.radius < 0 || this.x + this.radius > WIDTH) {
          ammuniResp.shift()
        } else {
          // 未越界的情况
          switch (this.direction) {
            case 'up':
              this.y -= this.step
              // 判断是否被命中npc
              if (this.x >= npc.x && this.x <= npc.x + 20 && this.y >= npc.y && this.y <= npc.y + 20) {
                shutDown()
              }
              this.draw()
              break
            case 'right':
              // 判断是否被命中npc
              if (this.x >= npc.x && this.x <= npc.x + 20 && this.y >= npc.y && this.y <= npc.y + 20) {
                shutDown()
              }
              this.x += this.step
              this.draw()
              break
            case 'bottom':
              // 判断是否被命中npc
              if (this.x >= npc.x && this.x <= npc.x + 20 && this.y >= npc.y && this.y <= npc.y + 20) {
                shutDown()
              }
              this.y += this.step
              this.draw()
              break
            case 'left':
              // 判断是否被命中npc
              if (this.x >= npc.x && this.x <= npc.x + 20 && this.y >= npc.y && this.y <= npc.y + 20) {
                shutDown()
              }
              this.x -= this.step
              this.draw()
              break
          }
        }
      }
    }
    let handle = null as any
    // 根据人物当前位置和方向，确定弹药的起始坐标
    const getAmmunPix = () => {
      if (role.direction === 'up') {
        const item = {
          cx: role.x + 10,
          cy: role.y - 10,
          paoX: role.x + 8,
          paoY: role.y - 8
        }
        return item
      } else if (role.direction === 'right') {
        const item = {
          cx: role.x + 30,
          cy: role.y + 10,
          paoX: role.x + 20,
          paoY: role.y + 8
        }
        return item
      } else if (role.direction === 'bottom') {
        const item = {
          cx: role.x + 10,
          cy: role.y + 30,
          paoX: role.x + 8,
          paoY: role.y + 20
        }
        return item
      } else {
        const item = {
          cx: role.x - 10,
          cy: role.y + 10,
          paoX: role.x - 8,
          paoY: role.y + 8
        }
        return item
      }
    }
    // 画出炮筒
    const drawPao = () => {
      console.log('坦克方向:', role.direction)
      switch (role.direction) {
        case 'up':
          cRole.fillRect(getAmmunPix().paoX, getAmmunPix().paoY, 4, 8)
          break
        case 'right':
          cRole.fillRect(getAmmunPix().paoX, getAmmunPix().paoY, 8, 4)
          break
        case 'bottom':
          cRole.fillRect(getAmmunPix().paoX, getAmmunPix().paoY, 4, 8)
          break
        case 'left':
          cRole.fillRect(getAmmunPix().paoX, getAmmunPix().paoY, 8, 4)
          break
      }
    }
    // 根据人物对象当前信息，绘制人物，同时判断越界
    const drawRole = (x: number, y: number) => {
      if (role.x - role.step < -10 || role.x + role.step > 410 || role.y - role.step < -10 || role.y + role.step > 810) {
        // alert('越界')
        log('越界')
      } else {
        role.x = x
        role.y = y
        cRole.clearRect(0, 0, WIDTH, HEIGHT)
        drawNpc()
        cRole.fillStyle = 'black'
        drawPao()
        cRole.fillRect(x, y, 20, 20)
      }
    }
    // 切换武器
    const changeWeapon = () => {
      weaponCir = Math.PI * Math.random()
    }
    // 空格键触发射击动作，全屏幕清除，再分别绘制人物和弹药
    const drawShot = () => {
      cancelAnimationFrame(handle)
      cRole.clearRect(0, 0, WIDTH, HEIGHT)
      drawRole(role.x, role.y)
      drawPao()
      for (let i = 0; i < ammuniResp.length; i++) {
        ammuniResp[i].update()
      }
      handle = requestAnimationFrame(drawShot)
    }
    // 任务的动作更新对应数据
    const roleAction = (action: string) => {
      // 获取任务坐标，执行对应行为
      // const people: any = document.getElementById('role')
      switch (action) {
        case 'up':
          role.direction = 'up'
          drawRole(role.x, role.y -= role.step)
          // people.style.top = Number(people.style.top.slice(0, -2)) - 10 + 'px'
          break
        case 'right':
          role.direction = 'right'
          drawRole(role.x += role.step, role.y)
          // people.style.left = Number(people.style.left.slice(0, -2)) + 10 + 'px'
          break
        case 'bottom':
          role.direction = 'bottom'
          drawRole(role.x, role.y += role.step)
          // people.style.top = Number(people.style.top.slice(0, -2)) + 10 + 'px'
          break
        case 'left':
          role.direction = 'left'
          drawRole(role.x -= role.step, role.y)
          break
        case 'shot':
          // const am = new Ammunition(role.x + 10, role.y - 10, 6, 4, role.diretion)
          // eslint-disable-next-line no-case-declarations
          const am = new Ammunition(getAmmunPix().cx, getAmmunPix().cy, 6, 4, role.direction)
          ammuniResp.push(am)
          drawShot()
      }
    }
    // 全局监听按键触发对应操作
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
    // 初始化游戏世界
    const initCanvas = () => {
      const canvasRole: any = document.getElementsByClassName('canvasRole')[0]
      const canvasAmmun: any = document.getElementsByClassName('canvasBackg')[0]
      cAmmun = canvasAmmun.getContext('2d')
      cRole = canvasRole.getContext('2d')
      drawBckg()
      drawRole(role.x, role.y)
    }
    onMounted(() => {
      initCanvas()
      requestAnimationFrame(npcFire)
    })
    return {
      drawBckg,
      initCanvas,
      drawRole,
      drawNpc,
      roleAction,
      drawShot,
      handle,
      changeWeapon,
      drawPao,
      ...toRefs(role),
      npcAmmuniResp
    }
  }
})
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .zombie {
      height: 100%;
      background-image: linear-gradient(120deg,#995a11,#4a3299);
      .game-title-st {
        margin: 2px auto;
        display: block;
        width: 100px;
        height: 80px;
        font-size: 100px;
      }
      .info {
          margin-bottom: 10px;
          .font-st {
            font-size: 20px;
            font-weight: bold;
            margin-right: 20px;
          }
      }
      .canvasDiv {
        width: 400px;
        box-sizing: content-box;
        margin: 10px auto;
        // border: 1px solid gainsboro;
        height: 700px;
        position: relative;
        .canvasRole {
          box-sizing: content-box;
          position: absolute;
          top: 0px;
          left: 0px;
          border: 1px solid gainsboro;
        }
        .canvasBackg {
          position: absolute;
          top: 0px;
          left: 0px;
          box-sizing: content-box;
          z-index: -100;
        }
    }

  }
</style>
