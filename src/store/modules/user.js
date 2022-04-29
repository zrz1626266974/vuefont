import {getToken, setToken, setIdToken} from '@/util/auth'
import {userlogin, adminlogin} from '@/api/login'

const user = {
  state: {
    token: getToken(),
    id: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_ID: (state, id) => {
      state.id = id
    }
  },
  actions: {
    Login ({ commit }, userInfo) {
      // const id = userInfo.id
      // console.log('Login action' + id)
      var login
      if (userInfo.type === 1) {
        login = userlogin
      } else {
        login = adminlogin
      }
      return new Promise((resolve, reject) => {
        login(userInfo).then(response => {
          const data = response.data
          // console.log('actions response ')
          // console.log(response)
          // console.log(data.data.one)
          console.log(data.data.one.id)
          if (userInfo.type === 1) {
            console.log('setIdToken')
            setIdToken(data.data.one.id)
            commit('SET_ID', data.data.one.id)
          } else {
            setToken(data.data.one.id)
            commit('SET_TOKEN', data.data.one.id)
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
