import request from './request';

export async function api_getMenuList() {
  return request({
    url: '/menu/list',
    method: 'get',
    noTips: true
  })
}

// 初始化菜单，处理好的数据发给后端，一次性完成 增删改
export async function api_initMenu(data: any) {
  return request({
    url: '/menu/init',
    method: 'post',
    data,
  })
}

// 修改菜单排序
export async function api_modifyMenuOrder(data: any) {
  return request({
    url: '/menu/order',
    method: 'put',
    data
  })
}

// 修改菜单配置
export async function api_modifyMenuConfig(data: any) {
  return request({
    url: '/menu/config',
    method: 'put',
    data
  })
}