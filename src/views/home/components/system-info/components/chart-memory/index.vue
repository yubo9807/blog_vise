<template>
  <div class="wrap">
    <div ref="chart" class="chart"></div>
  </div>
</template>

<script>
import { defineComponent } from '@vue/runtime-core';
import setup from './setup';

export default defineComponent({
  props: {
    memory: {
      type: Number,
      default: 0
    }
  },
  setup
})
</script>

<style lang='scss' scoped>
.wrap{
  height: 100%;
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