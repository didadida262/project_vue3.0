/*
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:10:26
 * @LastEditors: Hhvcg
 * Boids类
 */
import paper from 'paper'
interface SIZECanvas {
  width: number;
  heigth: number;
}

export class Boid {
  position: paper.Point
  head: any
  shortPath!: paper.Path;
  path!: paper.Path;
  tailAmount: number
  neckAmount: number
  maxSpeed: number
  maxForce: number
  vector: paper.Point
  acceleration: paper.Point
  canvasWH: SIZECanvas
  constructor (position: paper.Point, size: SIZECanvas, maxSpeed: number, maxForce: number) {
    this.position = position
    this.maxSpeed = maxSpeed
    this.maxForce = maxForce
    this.neckAmount = 3
    this.tailAmount = 10
    // 方向
    this.vector = paper.Point.random().multiply(2).subtract(new paper.Point(1, 1))
    // 步数
    this.acceleration = paper.Point.random().multiply(2)
    this.canvasWH = size
    this.createBoid()
  }

  createBoid () {
    this.head = new paper.Shape.Ellipse({
      center: this.position,
      size: [15, 10],
      fillColor: 'orange'
    })
    this.path = new paper.Path({
      strokeColor: 'green',
      strokWidth: 2,
      strokeCap: 'round'
    })
    for (let i = 0; i < this.tailAmount; i++) {
      this.path.add(new paper.Point(0, 0))
    }
    this.shortPath = new paper.Path({
      strokeColor: 'white',
      strokeWidth: 5,
      strokeCap: 'round'
      // selected: true
    })
    for (let i = 0; i < this.neckAmount; i++) {
      this.shortPath.add(new paper.Point(0, 0))
    }
  }

  updateVector () {
    // this.vector = this.acceleration
    console.log('this.vector>>', this.vector)
  }

  updatePosition () {
    const newP = this.position.add(this.vector.add(this.acceleration))
    if (newP.x >= this.canvasWH.width) {
      newP.x = 0
    } else if (newP.x < 0) {
      newP.x = this.canvasWH.width
    }
    if (newP.y <= 0) {
      newP.y = this.canvasWH.heigth
    } else if (newP.y > this.canvasWH.heigth) {
      newP.y = 0
    }
    this.position = newP.clone()
  }

  moveHead () {
    this.head.position = this.position
  }

  updateNeckAndTail () {
    const segmentsNeck: Array<paper.Segment> = this.shortPath.segments
    const segmentsTail: Array<paper.Segment> = this.path.segments
    segmentsNeck[0].point = this.position.clone()
    segmentsTail[0].point = this.position.clone()
    for (let i = 1; i < this.neckAmount; i++) {
      const curP = this.position.subtract(this.vector.normalize(1).multiply(i * 5))
      segmentsNeck[i].point = curP
    }
    for (let i = 1; i < this.tailAmount; i++) {
      const curP = this.position.subtract(this.vector.normalize(1).multiply(i * 5))
      segmentsTail[i].point = curP
    }
    // this.shortPath.smooth()
  }

  run (boids: Array<Boid>) {
    // this.flock(boids)
    // this.updateVector()
    this.updatePosition()
    this.moveHead()
    this.updateNeckAndTail()
  }

  separate (boids: Array<Boid>) {
    const desiredSeperation = 60
    // 引导steer
    // new point 生成一个各个属性均为0的向量
    let steer = new paper.Point()
    let count = 0
    // For every boid in the system, check if it's too close
    for (let i = 0; i < boids.length; i++) {
      const other = boids[i]
      const vector = this.position.subtract(other.position)
      const distance = vector.length
      if (distance > 0 && distance < desiredSeperation) {
        // Calculate vector pointing away from neighbor
        steer = steer.add(vector.normalize(1 / distance))
        count++
      }
    }
    // Average -- divide by how many
    if (count > 0) { steer = steer.divide(count) }
    if (!steer.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.length = this.maxSpeed
      steer = steer.subtract(this.vector)
      steer.length = Math.min(steer.length, this.maxForce)
    }
    return steer
  }

  align (boids: Array<Boid>) {
    const neighborDist = 25
    let steer = new paper.Point()
    let count = 0
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i]
      const distance = this.position.getDistance(other.position)
      if (distance > 0 && distance < neighborDist) {
        steer = steer.add(other.vector)
        count++
      }
    }

    if (count > 0) { steer = steer.divide(count) }
    if (!steer.isZero()) {
      // Implement Reynolds: Steering = Desired - Velocity
      steer.length = this.maxSpeed
      steer = steer.subtract(this.vector)
      steer.length = Math.min(steer.length, this.maxForce)
    }
    return steer
  }

  cohesion (boids: Array<Boid>) {
    const neighborDist = 100
    let sum = new paper.Point()
    let count = 0
    for (let i = 0, l = boids.length; i < l; i++) {
      const other = boids[i]
      const distance = this.position.getDistance(other.position)
      if (distance > 0 && distance < neighborDist) {
        sum = sum.add(other.position) // Add location
        count++
      }
    }
    if (count > 0) {
      sum = sum.divide(count)
      // Steer towards the location
      return this.steer(sum, false)
    }
    return sum
  }

  steer (target: paper.Point, slowdown: boolean) {
    let steer = null
    const desired = target.subtract(this.position)
    const distance = desired.length
    // Two options for desired vector magnitude
    // (1 -- based on distance, 2 -- maxSpeed)
    if (slowdown && distance < 100) {
      // This damping is somewhat arbitrary:
      desired.length = this.maxSpeed * (distance / 100)
    } else {
      desired.length = this.maxSpeed
    }
    steer = desired.subtract(this.vector)
    steer.length = Math.min(this.maxForce, steer.length)
    return steer
  }

  flock (boids: Array<Boid>) {
    // 分离
    const separation = this.separate(boids).multiply(3)
    // 对齐
    const alignment = this.align(boids)
    // 凝聚力
    const cohesion = this.cohesion(boids)
    this.acceleration = this.acceleration.add(separation)
    this.acceleration = this.acceleration.add(alignment)
    this.acceleration = this.acceleration.add(cohesion)
    // 此处三个向量更新acceleration属性值，严重关系到电子蝌蚪的活力
  }
}
