import request from '@/util/request'

export default {
  getReplyList () {
    return request({
      url: `reply/getReplyList`,
      method: 'get'
    })
  },
  // 获取分页评论的回复
  getReplyByComment (data, cur = 1, limit = 5) {
    return request({
      url: `reply/getReplyByComment/${cur}/${limit}`,
      method: 'post',
      data
    })
  },
  addReply (data) {
    return request({
      url: `reply/addReply`,
      method: 'post',
      data
    })
  },
  // 删除回复
  delReply (data) {
    return request({
      url: `reply/delReply`,
      method: 'post',
      data
    })
  }
}
