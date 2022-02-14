// 数值四舍五入
const neatPoints = (_points) => {
    const xArr = String(_points.x).split('')
    const yArr = String(_points.y).split('')
    const xIndex = xArr.indexOf('.')
    const yIndex = yArr.indexOf('.')
    let x = Math.floor(_points.x)
    let y = Math.floor(_points.y)
    if (Number(xArr[xIndex + 1]) >= 5) {
        x++
    }
    if (Number(yArr[yIndex + 1]) >= 5) {
        y++
    }
    return {
        x: x,
        y: y
    }
}

const _points = {
    x: 100,
    y: 10
}
console.log(neatPoints(_points))