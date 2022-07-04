<template>
  <div ref="wrap" class="clearfix layout-both-sides">
    <div class="left" :style="{ width: `calc(100% - ${rightWidth}px)`}">
      <slot name="left" />
    </div>
    <div ref="right" class="right" :style="{ width: rightWidth + 'px'}">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightWidth: {
      type: Number,
      default: 200
    }
  }
}
</script>

<style lang='scss'>
.layout-both-sides{
  margin-bottom: 14px;
  .left, .right{
    float: left;
  }
  .right {
    text-align: right;
  }
}
</style>