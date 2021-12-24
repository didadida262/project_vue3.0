import axios from '@/api/axios'

export const getStart = () =>
  axios({
    url: '/word',
    method: 'get'
  })
export const getImg = () =>
  axios({
    url: '/img',
    method: 'get',
    responseType: 'arraybuffer'
  })

export const getMusic = () =>
  axios({
    url: '/music',
    method: 'get',
    responseType: 'arraybuffer'
  })
export const login = (data: object) =>
  axios({
    url: '/signIn',
    method: 'post',
    data: data
  })

export const getUser = () =>
  axios({
    url: '/users',
    method: 'get'
  })
export const uploadFile = (file: any) =>
  axios({
    url: '/upload',
    method: 'post',
    data: file
  })

export const sendPic = (imgDate: string) =>
  axios({
    url: '/sendImg',
    method: 'post',
    data: {
      imgDate: imgDate
    }
  })
