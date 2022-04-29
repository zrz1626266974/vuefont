import request from '@/util/request'

export default {
  // 获取所有用户列表
  getUserList () {
    return request({
      url: '/user/getUserList',
      method: 'get'
    })
  },
  // 根据id获取用户
  getUserById (id) {
    return request({
      url: `/user/getUserById/${id}`,
      method: 'get'
    })
  },
  // 用户注册
  addUser (data) {
    return request({
      url: `/user/addUser`,
      method: 'post',
      data
    })
  },
  // 用户排名
  userRank () {
    return request({
      url: `/user/userRank`,
      method: 'get'
    })
  }
  // 根据id修改用户资料
  // updateUserById (id, data) {
  //   return request({
  //     url: `/user/updateById`,
  //     method: 'post',
  //     data
  //   })
  // }
}
