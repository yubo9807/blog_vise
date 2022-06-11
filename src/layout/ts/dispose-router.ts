import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { cloneObj } from '@/utils/object';

export default () => {
  const $router = useRouter();
  const $store = useStore();
  
  const newRoutes = ref();
  const role = $store.state.user.role;
  const { routes } = $router.options

  for (let i = 0; i < routes.length; i++) {
    if (routes[i].name === 'Layout') {
      newRoutes.value = routes[i].children;
      continue;
    }
  }

  // 递归处理侧边栏要显示的路由
  function dispose(routes: any, role = '') {
    // console.log(cloneObj(routes))
    for (let i = 0; i < routes.length; i++) {
      const meta = routes[i].meta;
      if (!meta) continue;
      if (meta?.roles) {
        const flag = meta.roles.includes(role);
        if (!flag) routes[i].hidden = true;
      }
      if (routes[i].children) {
        dispose(routes[i].children, role);
      }
    }
    return routes;
  }

  // const sliderRoutes = ref([]);
  // watch(() => $store.state.user.role, value => {
  //   sliderRoutes.value = dispose(newRoutes.value, value);
  //   console.log(sliderRoutes.value)
  // })

  return {
    routes: dispose(newRoutes.value, role),
    // sliderRoutes,
  }
}