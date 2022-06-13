import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { cloneObj } from '@/utils/object';

export default () => {
  const $router = useRouter();
  const $store = useStore();
  
  const queryRoute = $router.options.routes.find(val => val.name === 'Layout').children;

  function dispose(routes: any, role, arr = []) {
    const newRoutes = Object.assign([], routes);
    for (let i = 0; i < newRoutes.length; i++) {
      const { path, name, meta, children } = newRoutes[i];

      if (meta.hidden) continue;
      
      if (!meta.roles || meta.roles.includes(role)) {
        arr.push({ path, name, meta });
      }
      if (children && children.length > 0) {
        const index = arr.findIndex(item => item.name === name);
        if (index > 0) {
          arr[index].children = [];
          dispose(children, role, arr[index].children);
        };
      }
    }
    return arr;
  }

  const sliderRoutes = ref([]);
  watch(() => $store.state.user, value => {
    const { login, role } = value;
    if (login === 1) sliderRoutes.value = dispose(queryRoute, role);
    else sliderRoutes.value = [];
  }, { deep: true, immediate: true })

  return {
    sliderRoutes,
  }
}