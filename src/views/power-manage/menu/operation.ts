import { getMenuList, initialData } from './initData';
import { api_modifyMenuOrder } from '@/api/menu';
import { getCurrentInstance, ref } from 'vue';

export default () => {
  const current = getCurrentInstance();

  function sortdown(row) {
    const { name, parent } = row;
    const equalLevelMenu = initialData.filter(val => val.parent === parent);  // 找出同级别菜单
    const index = equalLevelMenu.findIndex(val => val.name === name);  // 自己所在的位置
    const ownMenu = equalLevelMenu[index];
    const nextMenu = equalLevelMenu[index + 1];  // 下一个同级菜单数据
    modifyMenuOrder(ownMenu, nextMenu);
  }

  function sortup(row) {
    const { name, parent } = row;
    const equalLevelMenu = initialData.filter(val => val.parent === parent);  // 找出同级别菜单
    const index = equalLevelMenu.findIndex(val => val.name === name);  // 自己所在的位置
    const ownMenu = equalLevelMenu[index];
    const frontMenu = equalLevelMenu[index - 1];  // 上一个同级菜单数据
    modifyMenuOrder(ownMenu, frontMenu);
  }

  async function modifyMenuOrder(obj1, obj2) {
    if (obj1 === undefined || obj2 === undefined) return;
    const res: any = await api_modifyMenuOrder({ replaceArr: [obj1.id, obj2.id]});
    if (res.code === 200) {
      getMenuList();
    }
  }

  const menuConfig = ref(null);
  function setting(row) {
    menuConfig.value = row;
    setTimeout(() => {
      const refs = current.refs;
      (refs.setMenuConfig as any).visible = true;
    }, 0)
  }

  return {
    setting,
    sortdown,
    sortup,
    menuConfig
  }
}