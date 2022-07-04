<template>
  <div class="clearfix">
  
    <!-- 菜单 -->
    <ul class="menu">
      <li
        v-for="(item, index) in menuList"
        :key="index"
        :class="item.name === $route.query.log ? 'active' : ''"
        @click="$router.replace({ query: { log: item.name } })"
      >{{ item.name }}</li>
    </ul>



    <div class="content">

      <!-- 搜索 -->
      <LayoutBothSides :rightWidth="150" class="header">
        <template #left>
          <el-input v-model="searchValue" placeholder="请输入URL" />
        </template>
        <template #right>
          <span class="access-number">被访问次数：{{ accessList.length }}</span>
        </template>
      </LayoutBothSides>

      <!-- 访问记录 -->
      <ul class="record">
        <li v-for="(item, index) in accessList" :key="index">
          <p>
            <strong>url:</strong>
            <el-link :href="item.url">{{ item.url }}</el-link>
          </p>
          <p><strong>accessTime</strong>{{ item.accessTime }}</p>
          <p><strong>from:</strong>{{ item.from }}</p>
          <p><strong>userAgent:</strong>{{ item.userAgent }}</p>
        </li>
      </ul>

    </div>

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