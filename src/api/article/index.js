import request from '@/util/request'

export default {
  getArticleList () {
    return request({
      url: '/article/getArticleList',
      method: 'get'
    })
  },
  getArticleById (data) {
    return request({
      url: `/article/getArticleById/${data}`,
      method: 'get'
    })
  },
  // 获取分页文章列表
  getArticleByPage (cur, limit = 5, keyword = '') {
    return request({
      url: `/article/getArticleByPage/${cur}/${limit}`,
      method: 'get',
      params: {
        keyword
      }
    })
  },
  // 获取用户文章列表--分页
  getUserArticleByPage (id, cur = 1, limit = 5, keyword = '') {
    return request({
      url: `/article/getUserArticleByPage/${id}/${cur}/${limit}`,
      method: 'get',
      params: {
        keyword
      }
    })
  },
  // 通过用户id获取文章列表
  getArticleByUser (data) {
    return request({
      url: `/article/getArticleByUser/${data}`,
      method: 'get'
      // data
    })
  },
  addArticle (data) {
    return request({
      url: `/article/addArticle`,
      method: 'post',
      data
    })
  },
  delArticle (data) {
    return request({
      url: `/article/delArticle`,
      method: 'post',
      data
    })
  }
}
