<template>
  <el-menu
    ref="slider"
    :collapse="$store.state.slider.putAway"
    class="el-menu-vertical-demo"
    background-color="transparent"
    :default-active="$route.name"
  >
    <SliderItem v-for="item in list" :key="item.name" :route="item" />
  </el-menu>
</template>

<script lang="ts">
import SliderItem from './slider-item.vue';

export default {
  name: 'Slidebar',
  components: {
    SliderItem
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    count: {  // 组件递归的层数，从 1 开始
      type: Number,
      default: 0
    },
  }
}
</script>

<style lang='scss' scoped>
.slide-bar{
  // padding-left: 16px;
  li{
    a{
      display: block;
      width: 100%;
      height: 100%;
      color: #ccc;
    }
    .slide-bar{
      height: 0;
      // overflow: hidden;
      transform: rotateX(90deg);
      transform-origin: top center;
      transition: height .3s linear, transform .3s linear;
    }
    &.open > .slide-bar{
      height: auto;
      transform: rotateX(0);
    }
  }
  .router-link-exact-active{
    color: white;
  }
  .icon{
    display: inline-block;
    width: 24px;
    text-indent: 0;
    text-align: center;
  }
  &.layer0 > li{
    transition: font-size .3s;
    > .router-link-active{
      background: #666;
    }
  }
}
.slide-bar.put-away{
  > li{
    font-size: 0;
    position: relative;
    i{
      width: 100%;
    }
    &:hover{
      .layer1{
        display: block;
      }
    }
  }
  .slide-bar{
    width: 200px;
    height: auto !important;
    transform: rotateX(0) !important;
    z-index: 9999;
  }
  .layer1{
    li{
      font-size: 16px;
    }
    position: absolute;
    top: 0;
    left: 0;
    background: #404040;
    transform: translateX(58px) !important;
    display: none;
  }
}

.el-menu{
  max-height: calc(100vh - 80px);
  overflow: auto;
  border: none;
  font-weight: 600;
}
</style>