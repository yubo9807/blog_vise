import router from './router';
import store from './store';

export default function routerGuard() {

  router.beforeEach((to, from, next) => {
    const role = store.state.user.role;
    
    const { roles, noCache, title }: any = to.meta;
    console.log(roles, role)
  
    // 根据角色设置缓存 tabs
    if (!noCache && to.name && title) {
      store.commit('tabs/add_page', { pageName: to.name, pageTitle: title });
    }

    if (!role || !roles || roles.includes(role)) {
      next();
    } else {
      router.push({ name: 'Home' })
    }

  })

}