const a = [1, 2, 3, 4]
const b = [2, 3, 4]

const f = (a, b) => {
    const res = []
    let i = 0
    let j = 0
    while (i < a.length & j < b.length) {
        if (a[i] < b[j]) {
            res.push(a[i])
            i++
        } else {
            res.push(b[j])
            j++
        }
    }
    if (i === a.length) {
        for (let x = j; x < b.length; x++) {
            res.push(b[x])
        }
    }
    if (j === b.length) {
        for (let x = i; x < a.length; x++) {
            res.push(a[x])
        }
    }
    return res
}

console.log('res:', f(a, b))
