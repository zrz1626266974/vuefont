import request from '@/util/request'

export default {
  // 获取所有活动列表
  getActivityList () {
    return request({
      url: '/activity/getActivityList',
      method: 'get'
    })
  },
  // 分页获取管理员的活动
  getAdminAcByPage (data, cur, limit = 5, keyword = '') {
    return request({
      url: `/activity/getAdminAcByPage/${cur}/${limit}`,
      method: 'post',
      data,
      params: {
        keyword
      }
    })
  },
  // 获取分页活动列表 -- 同时关键词搜索
  getAcByPage (cur, limit = 5, keyword = '') {
    return request({
      url: `/activity/getAcByPage/${cur}/${limit}`,
      method: 'get',
      params: {
        keyword
      }
    })
  },
  // 根据admin 获取相应的活动列表
  getActivityByAdmin (data) {
    return request({
      url: `/activity/getActivityByAdmin`,
      method: 'post',
      data
    })
  },
  // 根据活动id获取活动
  getActivityById (id) {
    return request({
      url: `/activity/getActivityById/${id}`,
      method: 'get'
    })
  },
  // 修改更新活动
  updateActivity (data) {
    return request({
      url: '/activity/update',
      method: 'post',
      data
    })
  },
  // 增加活动
  addActivity (data) {
    return request({
      url: `/activity/addActivity`,
      method: 'post',
      data
    })
  },
  // 删除活动
  delActivity (data) {
    return request({
      url: `/activity/delActivity`,
      method: 'post',
      data
    })
  }
}
