<template>
  <div>
    <div class="header">
      <span>占用内存：{{ total.size }}</span>
      <span>数据长度：{{ total.length }}</span>
      <el-link @click="$router.replace({ query: {} })">全部</el-link>
      <el-link @click="clearCache">清空缓存</el-link>
    </div>
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

<script>
import { defineComponent } from '@vue/runtime-core';
import setup from './setup';

export default defineComponent({
  setup
})
</script>

<style lang="scss" scoped>
.header{
  margin-bottom: 14px;
  >span, >a{
    margin-right: 20px;
  }
}
.list-wrap{
  font-family: Consolas, Monaco, Andale Mono, monospace;
  font-size: 12px;
  li{
    margin-bottom: 14px;
    padding: 6px 10px;
    background: #282c34;
    border-radius: 4px;
    color: #ccc;
    > p{
      line-height: 1.8;
      white-space: pre-wrap;
      word-break: break-all;
      &.pack-up{
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
      }
      &.key{
        color: #ffcc1b;
        cursor: pointer;
      }
      >strong{
        display: inline-block;
        width: 72px;
        color: #5dd7b9;
      }
    }
  }
}
</style>
