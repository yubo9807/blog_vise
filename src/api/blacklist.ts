import request from './request';

/**
 * 获取黑名单列表
 */
export function api_getBlacklist() {
  return request({
    url: '/blacklist',
    method: 'get',
  })
}

/**
 * 删除记录IP
 */
export function api_deleteBlacklistIP(data) {
  return request({
    url: '/blacklist',
    method: 'delete',
    data
  })
}