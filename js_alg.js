const Dep = {}

const defineReactive = (obj, key, val) => {
    Object.defineProperty(obj, key, {
        get: function () {
            const dep = {
                key: key,
                flag: false
            }
            Dep[key] = dep
            return val
        },
        set: function (newVal) {
            if (val !== newVal) {
                Dep[key].flag = true
            }
            Object.keys(Dep).forEach((key) => {
                console.log(`${key}变动`)
                if (Dep[key].flag) {
                    console.log(`${key}改变了`)
                }
            })
            val = newVal
        }
    })
}

class Observe {
    constructor (object) {
        this.walk(object)
    }

    walk (object) {
        Object.keys(object).forEach((key) => {
            if (typeof object[key] === 'object') {
                this.walk(object[key])
            } else {
                defineReactive(object, key, object[key])
            }
        })
    }
}
const obj = {
    name: 'hhvcg',
    old: 10,
    c: {
        a: 1,
        b: 2
    }
}
// eslint-disable-next-line no-new
new Observe(obj)
const watch = (obj, key) => {
    console.log(obj[key])
}
watch(obj, 'name')
obj.name = 'hhvcg'