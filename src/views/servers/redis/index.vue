<template>
  <div>

    <LayoutBothSides class="header" rightWidth="160px">
      <template #left>
        <span>占用内存：{{ total.size }}</span>
        <span>数据长度：{{ total.length }}</span>
      </template>
      <template #right>
        <el-link @click="$router.replace({ query: {} })">全部数据</el-link>
        <el-link @click="clearCache">清空缓存</el-link>
      </template>
    </LayoutBothSides>

    <ul class="list-wrap">
      <li v-for="item in table" :key="item.count">
        <p class="key" @click="$router.replace({ query: { path: item.key } })">
          <strong>Key：</strong>
          <span>{{ item.key }}</span>
        </p>
        <p>
          <strong>Size：</strong>
          <span>{{ item.size }} Byte</span>
        </p>
        <p>
          <strong>过期时间：</strong>
          <span>{{ item.overTime }}</span>
        </p>
        <p>
          <strong>缓存时间：</strong>
          <span>{{ item.cacheTime }}</span>
        </p>
        <p :class="[table.length > 1 ? 'pack-up' : '']">
          <strong>Value：</strong>
          <span>{{ item.value }}</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang='ts'>
import LayoutBothSides from '@/components/layout-both-sides/index.vue';
import { defineComponent } from '@vue/runtime-core';
import setup from './setup';

export default defineComponent({
  components: {
    LayoutBothSides
  },
  setup
})
</script>

<style lang="scss" scoped>
@import './module.scss';
</style>
