
interface NoCaches {
  name: string
  title: string
}

interface State {
  pageNames: string[]
  pageTitles: string[]
}

const KEEPALIVE_NAMES = 'KEEPALIVE_NAMES';
const KEEPALIVE_TITLES = 'KEEPALIVE_TITLES';

const state: State = {
  pageNames: ['Home'], // 有缓存的选项卡页面
  pageTitles: ['首页'],
}

function setStorage(keyName: string, val: string[] | '') {
  localStorage.setItem(keyName, JSON.stringify(val));
}
function getStorage(keyName: string) {
  const value: any = localStorage.getItem(keyName);
  return JSON.parse(value);
}

interface Page {
  pageName: string
  pageTitle: string
}
const mutations = {

  // 添加缓存组件
  add_page: (state: State, { pageName, pageTitle }: Page) => {

    if (!state.pageNames.includes(pageName)) {
      state.pageNames.push(pageName);
      // setStorage(KEEPALIVE_NAMES, state.pageNames);
    }

    if (!state.pageTitles.includes(pageTitle)) {
      state.pageTitles.push(pageTitle);
      // setStorage(KEEPALIVE_TITLES, state.pageTitles);
    }

  },

  // 删除缓存组件
  remove_page: (state: State, { pageName, pageTitle }: Page) => {
    const index1 = state.pageNames.indexOf(pageName);
    if (index1 >= 0) {
      state.pageNames.splice(index1, 1);
      // setStorage(KEEPALIVE_NAMES, state.pageNames);
    }
    const index2 = state.pageTitles.indexOf(pageTitle);
    if (index2 >= 0) {
      state.pageTitles.splice(index2, 1);
      // setStorage(KEEPALIVE_TITLES, state.pageTitles);
    }
  },

  // 清空缓存组件
  clear_tabs: (state: State) => {
    state.pageNames.length = 0;
    state.pageTitles.length = 0;
    // setStorage(KEEPALIVE_NAMES, '');
    // setStorage(KEEPALIVE_TITLES, '');
  },
}

export default {
  namespaced: true,
  state,
  mutations,
}
