// const arr = ["((()))","(()())","(())()","()(())","()()()"]

// const jude = (str) => {
// }
// const n = 3
// const flag = new Array(2 * n).fill(false)
// const temp = []
// const ff = (arr, path) => {
//     if (path.length === n * 2) {
//         if (temp.filter(item => JSON.parse(JSON.stringify(item)) === JSON.parse(JSON.stringify(path))).length === 0) {
//             console.log('合格path:', path)
//             temp.push([...path])
//             console.log('temp:', temp)
//         }
//     }
//     for (let i = 0; i < arr.length; i++) {
//         if (!flag[i]) {
//             flag[i] = true
//             path.push(arr[i])
//             ff(arr, path)
//             path.pop()
//             flag[i] = false
//         }
//     }
// }
// const f = (n) => {
//     const res = []
//     const a = []
//     for (let i = 0; i < n; i++) {
//         a.push('(')
//         a.push(')')
//     }
//     const allPai = ff(a, [])
//     console.log('a:', a)
//     console.log('all:', allPai)
//     // for (const item of allPai) {
//     //     if (jude(item)) {
//     //         res.push(item)
//     //     }
//     // }
//     return res
// }

// f(n)

const arr = [1, 2, 3, 4]
const flag = new Array(arr.length).fill(false)
const res = []
const f = (path) => {
    if (path.length === arr.length) {
        res.push(JSON.parse(JSON.stringify(path)))
    }
    for (let i = 0; i < arr.length; i++) {
        if (!flag[i]) {
            flag[i] = true
            path.push(arr[i])
            f(path)
            path.pop()
            flag[i] = false
        }
    }
}
f([])
console.log(res)
