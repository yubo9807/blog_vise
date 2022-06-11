import store from '@/store';
import { VALID } from '@/store/modules/user';
import { useRouter } from 'vue-router';
import { reactive } from 'vue';
import { api_signIn } from '@/api/login';
import env from '~/env_variable';

export default () => {
  const form = reactive({
    username: '',
    passwrod: ''
  })

  const $router = useRouter();
  async function signIn() {
    const response = await api_signIn(form);
    if (response.code === 200) {
      const { token } = response.data;
      store.commit('user/set_token', { type: VALID, payload: token });
      store.commit('user/set_login', 1);
      $router.replace('/home');
    }
  }

  return {
    SYSTEM_NAME: env.SYSTEM_NAME,
    form,
    signIn,
  }
}
