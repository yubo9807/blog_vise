<template>
  <div class="nav-bar">

    <ul class="left-wrap">
      <li @click="putAwaySlider">
        <i class="iconfont">&#xe623;</i>
      </li>
    </ul>

    <ul class="right-wrap">
      <li @click="lognOut">
        <i class="iconfont">&#xe66b;</i>
        <span>退出</span>
      </li>
      <li>
        <i class="iconfont">&#xe63d;</i>
        <span>{{ $store.state.user.info.name }}</span>
      </li>
    </ul>

  </div>
</template>

<script>
import setup from './setup';
import { defineComponent } from 'vue';
export default defineComponent({
  setup
})
</script>

<style lang="scss" scoped>
.nav-bar{
  height: 50px;
  line-height: 50px;
  padding: 0 10px;
  display: flex;
  justify-content: space-between;

  .left-wrap, .right-wrap{
    > li{
      float: left;
      margin: 0 10px;
      cursor: pointer;
      >i{
        margin-right: 6px;
      }
    }
  }

}
</style>