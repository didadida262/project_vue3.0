// 处理二进制流文件
export const _arrayBufferToBase64 = (buffer: any) => {
    let binary = ''
    // buffer = ['10010001',......]
    // bytes = [256, 255.....]
    // console.log('后端返回的东西:', buffer)
    const bytes = new Uint8Array(buffer)
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i])
    }
    // console.log('2:', binary)
    return window.btoa(binary)
}
