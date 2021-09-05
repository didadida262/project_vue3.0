import axios from 'axios'
import { Root } from '../url/url'

const service = axios.create({
  baseURL: Root,
  timeout: 5000
})
const commonAPI = {
  getStart () {
    return service.get('/word')
  },
  login (userInfo: object) {
    return service.post('/signIn', userInfo)
  }
}

service.interceptors.response.use((res) => {
  if (res.status === 200) {
    const resData = res.data
    return resData
  }
})

export { commonAPI }
