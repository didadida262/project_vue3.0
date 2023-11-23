// 计算绝对距离
export const absDistance = (pointOne: number[], pointTwo: number[]) => {
    return Math.sqrt(Math.pow(pointTwo[0] - pointOne[0], 2) + Math.pow(pointTwo[1] - pointOne[1], 2))
}