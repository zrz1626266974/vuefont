import request from '@/util/request'

export default {
  // 获取报名表list
  getRegList () {
    return request({
      url: '/reg/getRegList',
      method: 'get'
    })
  },
  // 根据id 和acid 唯一确定获取报名表
  getRegById (id, acid) {
    return request({
      url: `/reg/getRegById`,
      method: 'get',
      params: {
        id, acid
      }
    })
  },
  // 分页获取用户报名表
  getUserRegByPage (data, cur = 1, limit = 5, keyword = '') {
    return request({
      url: `/reg/getUserRegByPage/${cur}/${limit}`,
      method: 'post',
      data,
      params: {
        keyword
      }
    })
  },
  // 根据用户id获取报名表
  getRegByUser (data) {
    return request({
      url: `/reg/getRegByUser`,
      method: 'post',
      data
    })
  },
  // 根据活动acid获取报名表
  // getRegByActivity (data) {
  //   return request({
  //     url: `/reg/getRegByActivity/${data}`,
  //     method: 'get'
  //     // data
  //   })
  // },
  // 分页获取活动相应的报名表
  getRegByAcPage (acid, cur = 1, limit = 5, keyword = '') {
    return request({
      url: `/reg/getRegByAcPage/${cur}/${limit}`,
      method: 'get',
      params: {
        acid,
        keyword
      }
    })
  },
  getRegByActivity (data) {
    console.log('getRegByAc')
    console.log(data)
    return request({
      url: `/reg/getRegByActivity`,
      method: 'post',
      data
    })
  },
  // 根据用户id和活动acid获取报名表
  getRegByUserAndActivity (data) {
    return request({
      url: `/reg/getRegByUserAndActivity`,
      method: 'post',
      data
    })
  },
  // 更改报名表
  updateReg (data) {
    return request({
      url: `/reg/updateReg`,
      method: 'post',
      data
    })
  },
  // 删除报名表
  delReg (data) {
    return request({
      url: `/reg/delReg`,
      method: 'post',
      data
    })
  },
  //  增加报名表
  addReg (data) {
    return request({
      url: `/reg/addReg`,
      method: 'post',
      data
    })
  }
}
