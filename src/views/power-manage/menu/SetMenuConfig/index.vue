<template>
  <el-dialog v-model="visible">
    <p>是否禁用：<el-switch v-model="menuConfig.disable" /></p>
    <p>是否在侧边栏显示：<el-switch v-model="menuConfig.hidden" /></p>
    <p>直接显示子菜单<el-switch v-model="menuConfig.always_show" /></p>
    <p>添加到缓存<el-switch v-model="menuConfig.no_cache" /></p>
    <el-button @click="submit">确认</el-button>
  </el-dialog>
</template>

<script>
import { ref } from '@vue/reactivity'
import { watch } from '@vue/runtime-core';
import { api_modifyMenuConfig } from '@/api/menu';
import { getMenuList } from '../initData';
export default {
  props: {
    config: {
      type: Object,
      default: () => new Object()
    }
  },
  setup(props) {
    const visible = ref(false);
    const menuConfig = ref({})

    watch(
      () => visible.value,
      (value) => {
        if (value) {
          const { id, no_cache, disable, hidden, always_show } = props.config;
          menuConfig.value = { id, no_cache: !no_cache, disable: Boolean(disable), hidden: !hidden, always_show: Boolean(always_show) };
        }
      }
    )

    async function submit() {
      console.log(menuConfig.value)
      const { id, no_cache, disable, hidden, always_show } = menuConfig.value;
      const params = {
        id,
        config: { no_cache: Number(!no_cache), disable: Number(disable), hidden: Number(!hidden), always_show: Number(always_show) }
      }
      const res = await api_modifyMenuConfig(params);
      if (res.code == 200) {
        visible.value = false;
        getMenuList();
      }
    }

    return {
      visible,
      menuConfig,
      submit
    }
  }
}
</script>

<style>

</style>