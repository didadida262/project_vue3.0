import axios from 'axios'
import { Root } from '../url/url'

axios.defaults.timeout = 10000
axios.defaults.baseURL = Root

axios.interceptors.response.use((res) => {
  if (res.status === 200) {
    const resData = res.data
    return resData
  }
})

export default axios
