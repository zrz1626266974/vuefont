import request from '@/util/request'

export default {
  // 获取所有用户列表
  getAdminList () {
    return request({
      url: '/admin/findAllUser',
      method: 'get'
    })
  },
  // 根据id获取用户
  getAdminById (id) {
    return request({
      url: `/admin/${id}`,
      method: 'get'
    })
  },
  // 根据id修改用户资料
  updateAdminById (id, data) {
    return request({
      url: `/admin/updateById`,
      method: 'post',
      data
    })
  }
}
