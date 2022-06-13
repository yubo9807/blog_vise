import { watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';
import store from '@/store';
import { roleConfig } from '@/router/slidebar';
import { api_getUserInfo } from '@/api/login';

export default () => {
  const $store = useStore();
  const $router = useRouter();
  const $route = useRoute();

  // 没有 token 返回登陆页
  (async function() {
    const token = $store.state.user.token;
    if (token) {
      await getUserInfo();
    } else {
      exitLayout();
    }
  }())

  async function getUserInfo() {
    const userInfo = $store.state.user.info;
    if (Object.keys(userInfo).length > 0) return;

    const response = await api_getUserInfo();
    if (response.code === 200) {
      const { data } = response;
      store.commit('user/set_info', data);
      store.commit('user/set_role', roleConfig[data.role]);
      store.commit('user/set_login', 1);
    }
  }
  
  // 监听登录状态，退出返回登陆页
  watch(() => $store.state.user.login, value => {
    if (value === 2) {
      exitLayout();
    }
  })

  /**
   * 退出
   */
  function exitLayout() {
    const redirectHref = $route.path;
    $router.replace(`/login?redirect=${redirectHref}`);
  }

  return {}
}