<template>
  <div class="wrap">
    <div ref="chart" class="chart"></div>
    <span class="total-size">占用内存：{{ calculateByte(totalSize) }}</span>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import main from './setup';
import { calculateByte } from '@/utils/number';

export default defineComponent({
  setup() {
    return {
      ...main(),
      calculateByte
    }
  }
})
</script>

<style lang='scss' scoped>
.wrap{
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