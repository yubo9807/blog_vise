import request from './request';

/**
 * 获取用户列表
 */
export function api_getUserList() {
  return request({
    url: '/user/list',
    method: 'get',
  });
}
