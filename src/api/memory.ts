import requset from './request';

/**
 * 获取 redis 信息
 */
export function api_getMemoryRedis() {
  return requset({
    url: '/memory/redis',
    method: 'get',
  })
}

/**
 * 清空 redis 缓存
 */
export function api_clearMemoryRedis() {
  return requset({
    url: '/memory/redis',
    method: 'delete',
  })
}