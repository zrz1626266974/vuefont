import axios from 'axios'
import store from '../store'
import {getToken, getIdToken} from '@/util/auth'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: 'http://localhost:8080',
  timeout: 5000
})

service.interceptors.request.use(
  config => {
    if (store.getters.token || store.getters.id) {
      config.headers['admin-token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
      config.headers['user-token'] = getIdToken()
      console.log('request.interceptors')
      console.log(getToken())
      console.log(getIdToken())
      // console.log(store.getters.id)
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    /**
     * code为非20000是抛错 可结合自己业务进行修改
     */

    if (response.data.code === 20000) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
