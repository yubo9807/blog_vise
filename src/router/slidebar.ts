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

/**
 * 重新配置页面后清一下 LocalStorage
 */
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
      meta: { title: '首页', icon: '&#xe62e;' },
    },
    {
      path: 'logs',
      name: 'Logs',
      component: () => import('@/views/logs/index.vue'),
      meta: { title: '接口日志', icon: '&#xe610;', roles: ['admin'] },
    },
    {
      path: 'blacklist',
      name: 'Blacklist',
      component: () => import('@/views/blacklist/index.vue'),
      meta: { title: '黑名单', icon: '&#xe722;', roles: ['admin'] },
    },
    {
      path: 'users',
      name: 'Users',
      component: () => import('../views/users/index.vue'),
      meta: { title: '用户管理', icon: '&#xe6d6;', roles: ['admin'] },
    },
    {
      path: 'friend-link',
      name: 'FriendLink',
      component: () => import('@/views/friend-link/index.vue'),
      meta: { title: '友情链接', icon: '&#xe617;', roles: ['admin', 'user'] },
    },
    {
      path: 'power-manage',
      name: 'PowerManage',
      component: () => import('../views/power-manage/index.vue'),
      meta: { title: '权限分配', icon: '&#xe634;', roles: ['admin'] },
      children: [
        {
          path: 'menu',
          name: 'PowerManageMenu',
          component: () => import('../views/power-manage/menu/index.vue'),
          meta: { title: '菜单管理' },
        },
        {
          path: 'interface',
          name: 'PowerManageInterface',
          component: () => import('../views/power-manage/interface/index.vue'),
          meta: { title: '接口管理' },
        }
      ]
    },
  ]
}
