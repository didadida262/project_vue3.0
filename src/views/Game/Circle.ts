// export default class Cir {
//     x: number;
//     y: number;
//     radius: number;
//     dx: number;
//     dy: number;
//     color: string;
//     constructor (x: number, y: number, radius: number, dx: number, dy: number, color: string) {
//       this.x = x
//       this.y = y
//       this.radius = radius
//       this.dx = dx
//       this.dy = dy
//       this.color = color
//     }

//     draw () {
//       c.strokeStyle = 'white'
//       c.fillStyle = this.color
//       c.beginPath()
//       c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false)
//       c.fill()
//       c.stroke()
//     }

//     update () {
//       if (this.x + this.radius > 360 || this.x - this.radius < 0) {
//         this.dx = -this.dx
//       }
//       if (this.y + this.radius > 520 || this.y - this.radius < 0) {
//         this.dy = -this.dy
//       }
//       this.x += this.dx
//       this.y += this.dy
//       // if (Math.abs(this.x - moveInfo.actualX) < 5 && Math.abs(this.y - moveInfo.actualY) < 5) {
//       if (absDistance([this.x, this.y], [moveInfo.actualX, moveInfo.actualY]) < this.radius) {
//         if (this.radius < maxRadius) {
//           this.radius += 3
//         }
//       } else if (this.radius > minRadius) {
//         this.radius -= 3
//       }
//       this.draw()
//     }
//   }
