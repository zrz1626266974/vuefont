import request from '@/util/request'

export default {
  getCommentList () {
    return request({
      url: `comment/getCommentList`,
      method: 'get'
    })
  },
  // 根据cid获取comment
  getCommentById (data) {
    return request({
      url: `comment/getCommentById/${data}`,
      method: 'get'
    })
  },
  // 根据文章id获取评论
  getCommentByArticle (data) {
    return request({
      url: `comment/getCommentByArticle/${data}`,
      method: 'get'
    })
  },
  // 根据文章id 获取分页评论
  getCommentByPage (arid, cur, limit = 5) {
    return request({
      url: `comment/getCommentByPage/${arid}/${cur}/${limit}`,
      method: 'get'
    })
  },
  // 增加评论
  addComment (data) {
    return request({
      url: `comment/addComment`,
      method: 'post',
      data
    })
  },
  // 删除评论
  delComment (data) {
    return request({
      url: `comment/delComment`,
      method: 'post',
      data
    })
  }
}
