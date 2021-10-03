const log = console.log.bind(console)
const e = (selector: any) => {
    return document.querySelector(selector)
}

export { log, e }
