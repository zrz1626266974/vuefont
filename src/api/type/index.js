import request from '@/util/request'

export default {
  // 获取全部活动类型
  getTypeList () {
    return request({
      url: '/type/getTypeList',
      method: 'get'
    })
  },
  // 根据活动类型id获取活动类型
  getTypeById (id) {
    return request({
      url: `/type/getTypeById/${id}`,
      method: 'get'
    })
  }
}
