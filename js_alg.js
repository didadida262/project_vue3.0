const arr = [1, [2, 3], [[4], [5, 6]]]

const res = []
const f = (arr) => {
    for (const item of arr) {
        if (Array.isArray(item)) {
            f(item)
        } else {
            res.push(item)
        }
    }
}
f(arr)
console.log(res)