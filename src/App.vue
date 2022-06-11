<template>
  <router-view />
</template>

<script lang="ts">
import Layout from '@/layout/index.vue';
import Login from '@/views/login/index.vue';
import { getCurrentInstance, defineComponent } from 'vue';
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

    getUserInfo();
    async function getUserInfo() {
      const { info, token } = $store.state.user;
      if (!token) return;
      if (Object.keys(info).length > 0) return;

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
