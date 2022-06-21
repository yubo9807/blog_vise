<template>
  <div class="wrap">
    <div ref="chart" class="chart"></div>
    <span class="visitors-number">近一周访问量：{{ visitorsNumber }} 次</span>
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
  position: relative;
  .chart{
    height: 100%;
  }
  .visitors-number{
    position: absolute;
    top: 30px;
    right: 20px;
  }
}
</style>