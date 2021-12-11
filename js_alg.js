const graph = [
    [1, 0, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
]
const flag = new Array(graph.length).fill(false)
const ress = []
const dfs = (graph, index) => {
    const res = []
    res.push(index)
    const children = []
    for (let i = 0; i < graph[index].length; i++) {
        if (i !== index && (!flag[i]) && graph[index][i] === 1) {
            children.push(i)
        }
    }
    dfs(graph, children.shift())
    return res
}

for (let i = 0; i < graph.length; i++) {
    if (!flag[i]) {
        flag[i] = true
        ress.push(dfs(graph, i))
    }
}
console.log('ress:', ress)
