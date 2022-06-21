import Layout from '@/layout/index.vue';
import Home from '@/views/home/index.vue';

/**
 * key: 后端返回角色
 * value: 前端权限控制角色
 */
export const roleConfig = {
  'super': 'admin',
  'user': 'user',
  'visible': 'visible'
}

export default {
  path: '/',
  name: 'Layout',
  component: Layout,
  redirect: '/home',
  children: [
    {
      path: 'home',
      name: 'Home',
      component: Home,
      meta: { title: '首页', icon: '&#xe015;' },
    },
    {
      path: 'servers',
      name: 'Servers',
      component: () => import('@/views/servers/index.vue'),
      meta: { title: '服务器管理', icon: '&#xe001;', roles: ['admin', 'user'] },
      children: [
        {
          path: 'redis',
          name: 'ServersRedis',
          component: () => import('@/views/servers/redis/index.vue'),
          meta: { title: '数据缓存', roles: ['admin', 'user'] },
        },
        {
          path: 'connector',
          name: 'ServersConnector',
          component: () => import('@/views/servers/connector/index.vue'),
          meta: { title: '接口日志', roles: ['admin'] },
        },
      ]
    },
    {
      path: 'blacklist',
      name: 'Blacklist',
      component: () => import('@/views/blacklist/index.vue'),
      meta: { title: '黑名单', icon: '&#xe00a;', roles: ['admin'] },
    },
    {
      path: 'note',
      name: 'Note',
      component: () => import('@/views/note/index.vue'),
      meta: { title: '学习笔记', icon: '&#xe016;', roles: ['admin'] },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('@/views/users/index.vue'),
      meta: { title: '用户管理', icon: '&#xe012;', roles: ['admin'] },
    },
    {
      path: 'friend-link',
      name: 'FriendLink',
      component: () => import('@/views/friend-link/index.vue'),
      meta: { title: '友情链接', icon: '&#xe009;', roles: ['admin', 'user'] },
    },
    {
      path: 'power-manage',
      name: 'PowerManage',
      component: () => import('@/views/power-manage/index.vue'),
      meta: { title: '权限分配', icon: '&#xe013;', roles: ['admin'] },
      children: [
        {
          path: 'menu',
          name: 'PowerManageMenu',
          component: () => import('@/views/power-manage/menu/index.vue'),
          meta: { title: '菜单管理' },
        },
        {
          path: 'interface',
          name: 'PowerManageInterface',
          component: () => import('@/views/power-manage/interface/index.vue'),
          meta: { title: '接口管理' },
        }
      ]
    },
  ]
}
