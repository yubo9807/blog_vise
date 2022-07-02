<template>
  <ul class="system-info">
    <li v-for="(item, index) in list" :key="index">
      <strong>{{ item.name }}：</strong>
      <span>{{ item.value }}</span>
    </li>
  </ul>
</template>

<script lang='ts'>
import setup from './setup';
export default {
  setup
}
</script>

<style scoped>
ul.system-info{
  height: auto;
}
</style>