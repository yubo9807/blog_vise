<template>
  <router-view />
</template>

<script lang="ts">
import Layout from '@/layout/index.vue';
import Login from '@/views/login/index.vue';
import { getCurrentInstance, defineComponent, watch } from 'vue';
import { useStore } from 'vuex';
import store from './store';
import { api_getUserInfo } from './api/login';

export default defineComponent({
  components: {
    Login,
    Layout
  },
  setup() {
    const current = getCurrentInstance();
    const global: any = current?.appContext.config.globalProperties;
    // c(global.$env)

    const $store = useStore();

    watch(() => $store.state.user.token, value => {
      value && store.commit('user/set_login', 1);
    }, { immediate: true })

    watch(() => $store.state.user.login, value => {
      value === 1 && getUserInfo();
    }, { immediate: true })

    async function getUserInfo() {
      const response = await api_getUserInfo();
      if (response.code === 200) {
        const { data } = response;
        store.commit('user/set_info', data);
        const roleConfig = {
          'super': 'admin',
          'user': 'user',
          'visible': 'visible'
        }
        store.commit('user/set_role', roleConfig[data.role]);
      }
    }

  }
})
</script>
