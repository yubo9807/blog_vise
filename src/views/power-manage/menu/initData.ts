import { api_getMenuList, api_initMenu } from '@/api/menu';
import { ref } from 'vue';
import getRoutes from './getRoutes';


interface Menu {
  name: string,
  parent: string | null,
  children: Menu[],
}

export const menuData = ref([]);
export let initialData: Menu[] | null = null;  // 数据库里拿到的原始数据

export default () => {
    const localRouteList = getRoutes();

    (async function() {
      const data = await menuListHandle(localRouteList);
      if (data instanceof Array) {
        initialData = data;
        // 直接渲染
        menuData.value = renderMenu(data);
      } else {
        // 将处理过的数据发给后端，进行初始化 完成增删改
        const res: any = await api_initMenu(data);
        if (res.code === 200) {
          // 再次请求一次数据，进行渲染
          getMenuList();
        }
      }
    }())

    return {
      menuData,
    }
}


// 获取菜单列表并渲染
export async function getMenuList() {
  const res2: any = await api_getMenuList();
  if (res2.code === 200) {
    initialData = res2.data;
    menuData.value = renderMenu(res2.data);
  }
}


/**
 * 渲染菜单列表
 * @param list 
 */
function renderMenu(list: Menu[]) {
  const firstMenu = [], subMenu = [];
  list.forEach(val => {
    if (val.parent === null) firstMenu.push(val);
    else subMenu.push(val);
  });

  firstMenu.forEach(item => {
    renderSubMenu(item, subMenu);
  })
  
  // 渲染子菜单
  function renderSubMenu(menu: Menu, subMenuList: Menu[]) {
    let subList = subMenuList.filter((val, index) => val.parent === menu.name);
    menu.children = subList;

    // 递归再次查找要渲染的子子菜单
    subList.length > 0 && subList.forEach(item => {
      renderSubMenu(item, subMenuList);
    })
  }

  return firstMenu;
}


/**
 * 处理菜单数据，返回三个数组：需要 添加/修改/删除 的数据
 * @param localRouteList 
 * @returns 
 */
async function menuListHandle(localRouteList) {
  
  const res: any = await api_getMenuList();
  if (res.code === 200) {
    
    const { data } = res;
    const originalRouteObj = {}, localRouteObj = {};
    const addMenuList = [], modifyMenuList = [], deleteMenuList = [];

    // 要删除的菜单：本地没有，但数据库里有的菜单 
    localRouteList.map(val => {
      const { name, ...arge } = val;
      localRouteObj[val.name] = arge;
    });
    data.filter(val => {
      const { id, name, title, parent } = val;
      if (!localRouteObj[val.name]) deleteMenuList.push(id);

      // 要修改的菜单：数据库和本地都已经有了，但数据对不上
      const obj = localRouteObj[name];
      if (!obj) return;
      
      if (parent !== obj.parent || title !== obj.title) {
        obj && modifyMenuList.push({ id, name, title: obj.title, parent: obj.parent });
      }

    });
    
    // 要添加的菜单：数据库没有，但本地有的菜单
    data.forEach(val => {
      const { name, ...arge } = val;
      originalRouteObj[val.name] = arge;
    })
    localRouteList.filter(val => {
      if (!originalRouteObj[val.name]) addMenuList.push(val);
    })
    
    if (addMenuList.length === 0 && modifyMenuList.length === 0 && deleteMenuList.length === 0) return Promise.resolve(data);
    else return Promise.resolve({ addMenuList, modifyMenuList, deleteMenuList });
    
  } else {

    return Promise.reject(false);

  }
}
