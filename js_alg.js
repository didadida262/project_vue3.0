const { set } = require("nprogress")

const user = {
    name: 'hhvcg',
    old: 12,
    arr: [1, 2, 3, 4]
}

const proxyUser = new Proxy(user, {
    get (target, prop) {
        console.log('get....')
        return Reflect.get(target, prop)
    },
    set (target, prop, val) {
        console.log('set....')
        return Reflect.set(target, prop, val)
    }
})
proxyUser.arr[0] = 100
console.log('proxyUser:', proxyUser)
console.log('user:', user)