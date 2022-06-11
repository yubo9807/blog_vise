import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import store from '@/store';
import { ref } from 'vue';

export default () => {
  const router = useRouter();
  const { pageNames, pageTitles } = useStore().state.tabs;


  const menuTop = ref(0);  // 菜单坐标
  const menuLeft = ref(0);
  const isMenu = ref(false);  // 是否显示菜单

  const name = ref('');
  const title = ref('');
  
  // 关闭标签
  const closeTab = (pageName: string, pageTitle: string) => {
    store.commit('tabs/remove_page', { pageName, pageTitle });
    const len = pageNames.length;
    let lastName = pageNames[len - 1];

    router.replace({ name: lastName });
  }

  // 关闭自个儿
  const closeOwn = () => {
    closeTab(name.value, title.value);
    isMenu.value = false;
  }

  // 关闭全部
  const closeAll = () => {
    store.commit('tabs/clear_tabs');
    isMenu.value = false;
    router.replace({ name: 'Home' });
    store.commit('slider/reset_openSlider');
  }

  // 关闭其他
  const closeOther = () => {
    store.commit('tabs/clear_tabs');
    store.commit('tabs/add_page', { pageName: name.value, pageTitle: title.value })
    isMenu.value = false;
    router.replace({ name: name.value });
  }
  
  // 右键菜单
  const rightMenu = (e: MouseEvent, pageName: string, pageTitle: string) => {
    e.preventDefault();
    menuTop.value = e.clientY;
    menuLeft.value = e.clientX;
    isMenu.value = true;
    name.value = pageName;
    title.value = pageTitle;
  }

  return {
    pageNames,
    pageTitles,
    closeTab,
    closeOwn,
    closeAll,
    closeOther,
    rightMenu,
    menuTop,
    menuLeft,
    isMenu
  }
}
