import request from '@/util/request'

export default {
  // 百度地图
  // getMapByUid (uid) {
  //   return request({
  //     url: `/map/getMapByUid/${uid}`,
  //     method: 'get'
  //   })
  // },
  // 高德地图
  getAmapById (id) {
    return request({
      url: `/map/amap/${id}`,
      method: 'get'
    })
  }
}
