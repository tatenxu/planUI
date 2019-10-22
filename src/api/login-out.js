import axios from 'axios'

export function login(data) {
  console.log(process.env)
  return axios({
    baseURL: process.env.BASE_URL,
    url: '/login',
    method: 'post',
    data
  })
}

export function logout() {
  return axios({
    baseURL: process.env.BASE_URL,
    url: '/logout',
    method: 'post'
  })
}
