import request from './request';

/**
 * 获取黑名单列表
 */
export function api_getFriendLinklist() {
  return request({
    url: '/friendLink',
    method: 'get',
  })
}

/**
 * 获取黑名单列表
 */
export function api_deleteFriendLink(data) {
  return request({
    url: '/friendLink',
    method: 'delete',
    data,
  })
}