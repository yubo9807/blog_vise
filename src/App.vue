<template>
  <router-view />
</template>

<script lang="ts">
import Layout from '@/layout/index.vue';
import Login from '@/views/login/index.vue';
import { getCurrentInstance, defineComponent, watch } from 'vue';

export default defineComponent({
  components: {
    Login,
    Layout
  },
  setup() {
    const current = getCurrentInstance();
    const global: any = current?.appContext.config.globalProperties;
    // c(global.$env)

  }
})
</script>
