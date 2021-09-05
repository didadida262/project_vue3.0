// js算法专题

// 1. 树的遍历--递归版本
// var inorderTraversal = function(root) {
//     let res = []
//     const midSort = (node) => {
//         if(!node) return 
//         res.push(node.val)
//         midSort(node.left)
//         midSort(node.right)
//     }
//     midSort(root)
//     return res    

// };

// var inorderTraversal = function(root) {
//     let res = []
//     const midSort = (node) => {
//         if(!node) return 
//         midSort(node.left)
//         res.push(node.val)
//         midSort(node.right)
//     }
//     midSort(root)
//     return res    

// };

// var inorderTraversal = function(root) {
//     let res = []
//     const midSort = (node) => {
//         if(!node) return 
//         midSort(node.left)
//         midSort(node.right)
//         res.push(node.val)
//     }
//     midSort(root)
//     return res    

// };

// 2. 树的遍历--非递归版本
// 先序---先塞又儿子，再塞做儿子，保证根左右的遍历，精彩
// var inorderTraversal = function(root) {
//     if(!root) return []
//     let stack = []
//     let res = []
//     stack.push(root)
//     while(stack.length) {
//         let node = stack.pop()
//         res.push(node.val)
//         node.right && stack.push(node.right)
//         node.left && stack.push(node.left)
//     }
//     return res
// };

// 中序遍历：

// const midSort = (root) => {
//     if(!root) return []
//     let res = []
//     let stack = []
//     while(root || stack.length) {
//         while(root) {
//             stack.push(root)
//             root = root.left
//         }
//         root = stack.pop()
//         res.push(root.val)
//         stack.push(root.right)
//     }
//     return res    
// }



//     输入：
    // A: [1,2,3,2,1]
    // B: [3,2,1,4,7]
    // 输出：3
    // 解释：
    // 长度最长的公共子数组是 [3, 2, 1] 。
    // const f = (arr1,arr2) => {
    //     let res = []
    //     let child1 = allChilden(arr1)
    //     let map1 = {}
    //     for(const item of child1) {
    //         map1[item] = item
    //     }
    //     let child2 = allChilden(arr2)
    //     for(const item of child2) {
    //         if(map1.hasOwnProperty(item)) {
    //             if(item.length > res.length) {
    //                 res = item
    //             }
    //         }
    //     }       
    //     return res.length
    // }
    // f([1,2,3,2,1],[3,2,1,4,7])





    // 4.快排js
    // const quickSort = function(nums) {
    //     if(nums.length == 0 || nums.length == 1)  return nums
    //     let pivot = nums[0]
    //     let left = nums.slice(1).filter(item => item < pivot)
    //     let right = nums.slice(1).filter(item => item >= pivot)
    //     return quickSort(left).concat(pivot,quickSort(right))
    // }

    // let arr = [5,2,7,8,4]
    // console.log(quickSort(arr))

    // 5 相交区间--真尼玛肯爹，growingio要求写重叠区间居然都挂了。。。




//  6 最短路径
// const f = (grid) => {
//     const m = grid.length
//     const n = grid[0].length
//     let res = 0
//     if(m === 1) {
//         for(let item in grid[0]) {
//             res = res + Number(item)
//         }
//         return res
//     } else if(n === 1) {
//         grid.map(item => {
//             res = res + item[0]
//         })
//         return res
//     } else {
//         let dp = JSON.parse(JSON.stringify(grid))
//         for(let i=1;i< dp[0].length;i++) {
//             dp[0][i] = dp[0][i-1] + dp[0][i]
//         }
//         for(let i =1;i< m;i++) {
//             dp[i][0] = dp[i-1][0] + dp[i] [0]
//         }
//         for(let i = 1; i< m;i++) {
//             for(let j = 1;j< n;j++) {
//                 dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1]) + dp[i][j]
//             }
//         }
//         console.log('dp:',dp)
//     }
// }
// let grid = [  [1, 1, 1],  [3, 1, 5],  [4, 1, 1]  ]
// console.log(f(grid))

// ========================

// 7 数组全排列,兼容包含重复数字的数组，不过力扣官方表示超时？你大爷的
// 这道题在我看来不简单，毕竟递归理解起来还是蛮费劲的，其实从这道题我们就能看出计算机相对于人脑的先天优势，就通过下面这个函数，
// 我们成功实现了输入数组输出全排列的问题，相信以后的应用场景还是蛮多的
// const f = (arr) => {
//     if(!arr.length) return
//     let path = []
//     let res = []
//     let visited = new Array(arr.length).fill(false)
//     const seek = (path) =>{
//         if(path.length === arr.length) {
//             let flag = res.filter(item => JSON.stringify(item) === JSON.stringify(path))
//             if(!flag.length) {
//                 res.push([...path])
//             }
//             return
//         }
//         for(let i=0;i < arr.length;i++) {
//             if(!visited[i]) {
//                 path.push(arr[i])
//                 visited[i] = true
//                 seek(path)
//                 path.pop()
//                 visited[i] = false
//             }
//         }
//     }
//     seek(path)
//     return res
// }

// let arr = [1,2,3,4]

// console.log('res:',f(arr,res,[]))


// 8 连续子序列
// const f = (arr) =>{
//     let res = []
//     for(let i = 0; i< arr.length;i++) {
//         for(let j = i; j < arr.length;j++) {
//             let temp = arr.slice(i,j+1)
//             res.push(temp)
//         }
//     }
//     let sum = 0
//     res = res.filter(item => item.length % 2 !== 0)
//     let result = []
//     for(let i=0;i< res.length;i++) {
//         result.push(...res[i])
//     }
//     let s = result.reduce((a,b) => {
//         return a+b
//     })
//     return s

// }

// f([1,2,3])

// 9. 求根节点到叶子结点的数字之和
// 递归得代码下意识地会去背。。。

// var sumNumbers = function(root) {
//     if(!root) return 0
//     let sum = 0
//     const dfs = (node, cur) => {
//         cur = cur *10 + node.val
//         if(!node.left && !node.right) {
//             sum = sum + cur
//         }
//         if(node.left) dfs(node.left,cur)
//         if(node.right) dfs(node.right,cur)
//     }
//     dfs(root,0)
//     return sum
//     // console.log(sum)
// };

// 10.判断回文链表
// const isPalindrome = function(head) {
//     const arr = []
//     while(head) {
//         arr.push(head.val)
//         head = head.next
//     }
//     const origin = JSON.parse(JSON.stringify(arr))
//     arr.reverse()
//     for(let i =0;i <arr.length;i++) {
//         if(arr[i] !== origin[i]) return false
//     }
//     return true
// };

// 11.
// 输入:
// [
//   [1,3,1],
//   [1,5,1],
//   [4,2,1]
// ]
// 输出: 7
// 解释: 因为路径 1→3→1→1→1 的总和最小。

// const f = (grid) => {
//     let dp = JSON.parse(JSON.stringify(grid))
//     dp = dp.map(item => {
//         item = item.map(itemm => parseInt(itemm))
//         return item
//     })
//     console.log('dp1:',dp)
    
//     for(let i =1;i < grid[0].length;i++) {
//         dp[0][i] = dp[0][i-1] + dp[0][i]
//     }

//     for(let i =1; i< grid.length;i++) {
//         dp[i][0] = dp[i-1][0] + dp[i][0] 
//     }
//     for(let i =1;i < grid.length;i++) {
//         for(let j = 1; j< grid[0].length;j++) {
//             dp[i][j] = Math.min(dp[i-1][j],dp[i][j-1]) + dp[i][j]
//         }
//     }
//     console.log('dp2:',dp)
//     return dp[grid.length-1][grid[0].length-1]
// }

// f([
//     [1,3,1],
//     [1,5,1],
//     [4,2,1]
//   ])


// 12. 判断子串
    // 判断s2是否为s1子串
    // const childStr = function(s1,s2) {
    //     let i = 0;
    //     let j = 0;
    //     while( i < s1.length && j < s2.length) {
    //         if(s1[i] === s2[j]) {
    //             i++;
    //             j++
    //         } else {
    //             i = i - j + 1
    //             j = 0
    //         }
    //     }
    //     if( j === s2.length) {
    //         return true
    //     }else {
    //         return false
    //     }
    // }  
    // console.log(childStr('ababab','acb'))

        // 13 多用用正则吧，省不少事儿
    // const paragraph = "Bob hit a ball,1,2 the hit BALL flew far after it was hit."
    // const banned = ["hit"]
    // let arr = paragraph.toLocaleLowerCase().match(/[a-z\d]+/g)
    // console.log('res:',arr)
    // console.log('arr:',arr)
    // let map = {}
    // for(const item of arr) {
    //     if(map.hasOwnProperty(item)) {
    //         map[item][1]++
    //     } else {
    //         map[item] = [item,1]
    //     }

    // }
    // console.log('map:',map)
    // let res = []
    // for(const key in map) {
    //     res.push(map[key])
    // }
    // res.sort((a,b) => b[1] - a[1])
    // console.log('res:',res)

    // 14.顺时针打印矩阵 29
    // const f = function(matrix) {
    //     let res = []
    //     let num = matrix.length * matrix[0].length
    //     while(matrix.length !== 0) {
    //         if(matrix.length === 1) {
    //             res.push(...matrix[0])
    //             break
    //         }
    //         if(matrix[0].length === 1) {
    //             res.push()
    //         }            
    //         //取第一行
    //         // console.log('...matrix.splice(0,1)[0]:',...matrix.splice(0,1)[0])
    //         res.push(...matrix.splice(0,1)[0])  
    //         console.log('res1:',res)
    //         console.log('matrix1:',matrix)
    //         // 取最后一列
    //         for(let i = 0; i < matrix.length;i++) {
    //             res.push(matrix[i].splice(-1,1)[0])
    //         }
    //         if(res.length === num) return res
    //         console.log('res2:',res)
    //         console.log('matrix2:',matrix)
    //         // 取最后一行
    //         res.push(...matrix.splice(-1,1)[0].reverse())
    //         console.log('res3:',res)
    //         console.log('matrix3:',matrix)
    //         // 取第一列
    //         for(let i = matrix.length - 1;i >= 0;i--) {
    //             res.push(matrix[i].splice(0,1)[0])
    //         }
    //         console.log('res4:',res)
    //         console.log('matrix4:',matrix)

    //     console.log('res:',res)
    //     }
    //     }
        
    // const matrix = [[7],[9],[6]]
    // f(matrix)
    
    // 15.生成所有大小写字母
    // const gene = () => {
    //     let dict_s = []
    //     let dict_b = []
    //     for(let i = 65; i< 91;i++) {
    //         dict_b.push(String.fromCharCode(i))
    //     }
    //     for(let i = 97;i < 123;i++) {
    //         dict_s.push(String.fromCharCode(i))
    //     }
    //     console.log('dicr_s:',dict_s)
    //     console.log('dicr_b:',dict_b)
    // }

    // gene()

    // 16 经典排序算法
    // 冒泡
  // const bubble = (arr) => {
  //   for(let i = arr.length - 1; i >= 0;i--) {
  //     for(let j = 1; j <= i;j++) {
  //       if(arr[j] <= arr[j-1]) {
  //         let temp = arr[j]
  //         arr[j] = arr[j-1]
  //         arr[j-1] = temp
  //       }
  //     }
  //   }
  //   return arr
  // }
  
  const quickSort = (arr) => {
    if(arr.length === 0 || arr.length === 1) return arr
    let pivot = arr[0]
    let gerater = arr.slice(1).filter(item => item >= pivot)
    let lesser = arr.slice(1).filter(item => item < pivot)
    return quickSort(lesser).concat(pivot, quickSort(gerater))
  }
  const arr = [2,3,7,5,6,7,8,6]
  // console.log(bubble(arr))
  console.log('asdasd',quickSort(arr))