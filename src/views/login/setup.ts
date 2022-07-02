import store from '@/store';
import { VALID } from '@/store/modules/user';
import { useRouter, useRoute } from 'vue-router';
import { roleConfig } from '@/router/slidebar';
import { reactive } from 'vue';
import { api_signIn, api_getUserInfo } from '@/api/login';
import env from '~/env_variable';

export default () => {
  const $router = useRouter();
  const $route = useRoute();

  const form = reactive({
    username: '',
    password: ''
  })

  async function signIn() {
    const response = await api_signIn(form);
    if (response.code === 200) {
      const { token } = response.data;
      store.commit('user/set_token', { type: VALID, payload: token });
      await getUserInfo();
      const redirect = $route.query.redirect || '/home';
      $router.replace((redirect as string));
    }
  }

  async function getUserInfo() {
    const response = await api_getUserInfo();
    if (response.code === 200) {
      const { data } = response;
      store.commit('user/set_info', data);
      store.commit('user/set_role', roleConfig[data.role]);
      store.commit('user/set_login', 1);
    }
  }

  return {
    SYSTEM_NAME: env.SYSTEM_NAME,
    form,
    signIn,
  }
}
