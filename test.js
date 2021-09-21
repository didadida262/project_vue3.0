// const n = 4
// const a = [1]

// const f = (num) => {
//   const arr = String(num).split('')
//   let res = ''
//   for (let i = 0; i < arr.length;) {
//     if (arr[i] !== arr[i + 1]) {
//       res = res + '1' + arr[i]
//       i++
//     } else {
//       let index = 1
//       for (let j = i + 1; j < arr.length; j++) {
//         if (arr[j] === arr[i]) {
//           index++
//         } else {
//           break
//         }
//       }
//       res += String(index) + arr[i]
//       i = i + index
//     }
//   }
//   return Number(res)
// }

// for (let i = 1; i <= n; i++) {
//   a[i] = f(a[i - 1])
// }
// console.log(a[4])

document.body.addEventListener('click', () => {
  alert('alloha1')
})

document.body.addEventListener('click', () => {
  alert('alloha2')
})

document.body.addEventListener('click', () => {
  alert('alloha3')
})
