/*
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:10:26
 * @LastEditors: Hhvcg
 * Boids类
 */
import paper from 'paper'

export class Boid {
  position: paper.Point
  head: any
  shortPath: paper.Path | undefined
  path: paper.Path | undefined
  tailAmount: number
  neckAmount: number
  vector: paper.Point
  constructor (position: paper.Point) {
    this.position = position
    this.neckAmount = 3
    this.tailAmount = 10
    this.vector = new paper.Point(0)
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
    this.shortPath = new paper.Path({
      strokeColor: 'white',
      strokWidth: 4,
      strokeCap: 'round'
    })
  }

  updateVector () {
    this.vector = paper.Point.random()
  }

  updatePosition () {
    const newP = this.position.add(this.vector)
    this.position = newP.clone()
  }

  moveHead () {
    this.head.position = this.position
  }

  run () {
    this.updateVector()
    this.updatePosition()
    this.moveHead()
  }
}
