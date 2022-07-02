<template>
  <div class="clearfix">
  
    <ul class="menu">
      <li
        v-for="(item, index) in menu"
        :key="index"
        :class="item.name === $route.query.log ? 'active' : ''"
        @click="$router.replace({ query: { log: item.name } })"
      >{{ item.name }}</li>
    </ul>

    <div class="content">
      <span>访问次数：{{ list.length }}</span>
      <ul class="record">
        <li v-for="(item, index) in list" :key="index">
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

<script>
import { defineComponent } from '@vue/runtime-core';
import setup from './setup';

export default defineComponent({
  setup
})
</script>

<style lang="scss" scoped>
@import './module.scss';
</style>