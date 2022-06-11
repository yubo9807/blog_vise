import { watch, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router'

export default () => {
  const $route = useRoute();
  const $router = useRouter();
  const current: any = getCurrentInstance();

  // 监听路由变化，展开对应的侧边栏
  watch(
    () => $route.name,
    (value) => {
      $router.getRoutes().filter(val => {
        if (val.name === value && val.children?.length > 0) {
          // 打开菜单
          current.refs.slider.open(value)
        }
      })
    }
  )
  
  return {}
}
