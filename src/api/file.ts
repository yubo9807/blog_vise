import request from './request';

/**
 * 获取黑名单列表
 */
export function api_getFileListOrContent(params) {
  return request({
    url: '/file/read',
    method: 'get',
    params,
  })
}