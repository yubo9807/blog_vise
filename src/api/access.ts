import request from './request';

/**
 * 获取访客记录列表
 */
export function api_getAccessRecordList(params) {
  return request({
    url: '/access',
    method: 'get',
    params
  })
}