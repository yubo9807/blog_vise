import { useStore } from 'vuex';
import { computed, getCurrentInstance, watch, ref } from 'vue';

export default () => {
  const $store = useStore();
  const role = $store.state.user.role;

  // 处理路由
  const current: any = getCurrentInstance();
  const list = computed(() => current.ctx.list);
  const slideList = ref(initMenu(list.value));

  // 初始化菜单
  function initMenu(list, newList = []) {
    list.filter((val: any, index: number) => {

      // 对设置了权限的隐藏
      if (val.meta.roles && !val.meta.roles.includes(role)) {
        val.meta.hidden = true;
      }
      
      // 直接显示子组件
      if (val.meta.alwaysShow && val.children?.length > 0) {
        slideList.value.splice(index, 0, ...val.children);
        val.meta.hidden = true;
      }
      
      // 设置隐藏的组件不进行展示
      if (val.meta.hidden) return;

      // 重新整理下有用的属性
      newList.push({
        path: val.redirect || val.path,
        meta: val.meta,
        name: val.name,
        component: val.component,
        children: val.children,
      })

      if (newList[index] && val.children && val.children.length > 0) {
        newList[index].children = [];
        initMenu(val.children, newList[index].children);
      }

    })
    return newList;
  }

  // 需要隐藏哪些组件，把组件名给我
  function hiddenMenu(names: string[]) {
    list.value.filter((val: any, index: number) => {
      if (names.includes(val.name)) list.value[index].meta.hidden = true;
    })
    slideList.value = initMenu(list.value);
  }

  // 监听父组件传过来要隐藏的组件name值
  watch(
    () => current.ctx.hiddenName,
    (value) => {
      hiddenMenu(value);
    }
  )

  return {
    slideList,
  }
}
