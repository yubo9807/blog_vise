import request from './request';

export function api_getInterfaceList(params) {
  return request({
    url: '/nozzle',
    method: 'get',
    params
  })
}