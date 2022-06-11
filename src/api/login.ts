import request from './request';

/**
 * 登录
 */
export function api_signIn(data) {
  return request({
    url: '/user/signIn',
    method: 'post',
    data
  })
}

/**
 * 获取用户信息
 */
export function api_getUserInfo() {
  return request({
    url: '/user/current',
    method: 'get',
  });
}
