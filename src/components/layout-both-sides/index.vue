<template>
  <div ref="wrap" class="clearfix layout-both-sides">
    <div class="left" :style="{ width: `calc(100% - ${rightWidth})`}">
      <slot name="left" />
    </div>
    <div ref="right" class="right" :style="{ width: rightWidth}">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    rightWidth: {
      type: String,
      default: '200px'
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