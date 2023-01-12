/*
 * @Author: Hhvcg
 * @Date: 2022-02-16 18:13:14
 * @LastEditors: -_-
 * @Description:
 */
import axios from '@/api/axios'

export const getTestImg = () =>
  axios({
    url: '/getTestImg',
    method: 'get',
    responseType: 'blob'
  })

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

export const getData = () =>
  axios({
    url: '/getPd',
    method: 'get'
  })
