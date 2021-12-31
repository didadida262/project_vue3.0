// const user = {
//     name: 'hhvcg'
// }
// const proxyUser = new Proxy(user, {
//     get (target, prop) {
//         console.log('get....')
//         return Reflect.get(target, prop)
//     },
//     set (target, prop, val) {
//         console.log('set....')
//         return Reflect.set(target, prop, val)
//     }
// })
// proxyUser.name = 'as'

// 数组原地去重
// const f = (arr) => {
//     if (arr.length <= 1) return arr
//     let i = -1
//     for (let j = 0; j <= arr.length - 1; j++) {
//         if (arr[j] !== arr[j + 1]) {
//             i++
//             arr[i] = arr[j]
//         }
//     }
//     // if (arr[i] !== arr[arr.length - 1]) {
//     //     arr[i + 1] = arr[arr.length - 1]
//     // }
//     arr.length = i + 1
//     console.log(arr)
//     return arr
// }

// const arr = [1, 2, 3, 3]
// f(arr)
// console.log(arr)

const arr = [1, 8, 5, 4, 2]

const quick = (arrNew) => {
    if (arrNew.length <= 1) return arrNew
    // const arrNew = JSON.parse(JSON.stringify(arr))
    const pivot = arrNew[0]
    const greater = arrNew.slice(1).filter(item => item >= pivot)
    const lesser = arrNew.slice(1).filter(item => item < pivot)
    console.log('greater:', greater)
    console.log('lesser:', lesser)
    return quick(lesser).concat([pivot], quick(greater))
}
console.log(quick(arr))
console.log(arr)
