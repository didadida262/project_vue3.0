import paper from 'paper'

const log = console.log.bind(console)
const e = (selector: HTMLElement | any) => {
    return document.querySelector(selector)
}

/**
 * @description: 获取试图范围内的随机位置点
 * @param {number} width
 * @param {number} height
 * @return {*}
 */
export const getRandomPoint = (width: number, height: number) => {
    const rand = paper.Point.random()
    return new paper.Point(rand.x * width, rand.y * height)
}
