import axios from '@/api/axios'

export const getStart = () =>
  axios({
    url: '/word',
    method: 'get'
  })

export const login = (data: any) =>
  axios({
    url: '/login',
    method: 'post',
    data: data
  })

export const getUser = () =>
  axios({
    url: '/users',
    method: 'get'
  })
