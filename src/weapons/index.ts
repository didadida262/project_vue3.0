const log = console.log.bind(console)
const e = (selector: HTMLElement | any) => {
    return document.querySelector(selector)
}

export { log, e }
