import request from '@/util/request'

export function userlogin (loginInfo) {
  return request({
    url: `/user/login`,
    method: 'post',
    data: loginInfo
  })
}

export function adminlogin (loginInfo) {
  return request({
    url: `/admin/login`,
    method: 'post',
    data: loginInfo
  })
}

// export function login (loginInfo) {
//   return request({
//     url: `/login/${option}`,
//     method: 'post',
//     data: loginInfo
//   })
// }
