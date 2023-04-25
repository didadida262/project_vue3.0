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
  constructor (position: paper.Point) {
    this.position = position
    this.createBoid()
  }

  createBoid () {
    this.head = new paper.Shape.Ellipse({
      center: this.position,
      size: [15, 10],
      fillColor: 'orange'
    })
  }
}
