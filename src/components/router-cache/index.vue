/**
 * vue3 KeepAlive 使用方式有变动
 * https://v3.cn.vuejs.org/api/built-in-components.html#keep-alive
 */
<template>
  <router-view v-slot="{ Component }">
    <keep-alive :include="pageNames">
      <component :is="Component"/>
    </keep-alive>
  </router-view>
</template>

<script lang='ts'>
import { useStore } from 'vuex';

export default {
  setup() {
    const pageNames = useStore().state.tabs.pageNames;
    return {
      pageNames,
    }
  }
}
</script>
