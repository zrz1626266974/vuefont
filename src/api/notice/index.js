import request from '@/util/request'

export default {
  // 获取公告list
  getNoticeList () {
    return request({
      url: '/notice/getNoticeList',
      method: 'get'
    })
  },
  // 获取分页公告列表
  getNoticeByPage (cur, limit = 5, keyword = '') {
    return request({
      url: `/notice/getNoticeByPage/${cur}/${limit}`,
      method: 'get',
      params: {
        keyword
      }
    })
  },
  // 分页获取关键词查询结果
  searchNotice (keyword, cur = 1, limit = 5) {
    return request({
      url: `/notice/searchNotice/${cur}/${limit}`,
      method: 'get',
      params: {
        keyword
      }
    })
  },
  // 根据id获取公告
  getNoticeById (id) {
    return request({
      url: `/notice/getNoticeById/${id}`,
      method: 'get'
    })
  },
  // 增加公告
  addNotice (data) {
    return request({
      url: `/notice/addNotice`,
      method: 'post',
      data
    })
  },
  // 删除公告
  delNotice (data) {
    return request({
      url: `/notice/delNotice`,
      method: 'post',
      data
    })
  },
  // 更新公告
  updateNotice (data) {
    return request({
      url: `/notice/updateNotice`,
      method: 'post',
      data
    })
  }
}
