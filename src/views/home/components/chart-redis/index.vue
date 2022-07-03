<template>
  <div class="wrap">
    <div ref="chart" class="chart"></div>
    <span class="total-size">占用内存：{{ totalSize }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import setup from './setup';

export default defineComponent({
  setup
})
</script>

<style lang='scss' scoped>
.wrap{
  height: 400px;
  position: relative;
  .chart{
    height: 100%;
  }
  .total-size{
    position: absolute;
    top: 30px;
    right: 20px;
  }
}
</style>