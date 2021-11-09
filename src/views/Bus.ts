class Bus {
    lists: { [key: string]: Array<Function>}
    constructor () {
        this.lists = {}
    }

    $emit (name: string, data?: any) {
        console.log('jin')
        console.log(this.lists)
        if (this.lists[name]) {
            this.lists[name].forEach(fn => {
                fn(data)
            })
        }
    }

    $on (name: string, fn: any) {
        this.lists[name] = this.lists[name] || []
        this.lists[name].push(fn)
    }

    $del (name: string) {
        delete this.lists[name]
    }
}
const bus = new Bus()
export default bus
