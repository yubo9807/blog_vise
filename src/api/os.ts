import requset from './request';

/**
 * 获取系统数据
 */
export function api_getSystemInfo() {
  return requset({
    url: '/os',
    method: 'get',
  })
}

/**
 * 变化的系统数据
 */
export function api_getSystemInfoDynamic() {
  return requset({
    url: '/os/dynamic',
    method: 'get',
  })
}