const log = console.log.bind(console)
const e = (selector: any) => {
    return document.querySelector(selector)
}
const change = (obj: any) => {
    obj.name = 'change'
}
export { log, e, change }
