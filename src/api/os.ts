import requset from './request';


export function api_getSystemInfo() {
  return requset({
    url: '/os',
    method: 'get',
  })
}