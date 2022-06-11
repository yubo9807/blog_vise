<template>
  <ul class="clearfix tabs">
    <li v-for="(item, index) in pageNames" :key="item" @contextmenu="rightMenu($event, item, pageTitles[index])">
      <router-link :to="{name: item}">{{ pageTitles[index] }}</router-link>
      <span v-if="item !== 'Home'" class="close" @click="closeTab(item, pageTitles[index])"></span>
    </li>
  </ul>
  
  <div v-show="isMenu" class="mask" @click.self="isMenu = false">
    <ul class="menu" :style="{top: menuTop + 'px', left: menuLeft + 'px'}">
      <li @click="closeOwn">关闭</li>
      <li @click="closeAll">关闭全部</li>
      <li @click="closeOther">关闭其他</li>
    </ul>
  </div>
</template>

<script lang='ts'>
import tabs from './tabs';

export default {
  setup() {
    return {
      ...tabs(),
    }
  }
}

</script>

<style lang="scss" scoped>
.tabs{
  height: 40px;
  line-height: 40px;
  li{
    float: left;
    padding: 0 12px;
    position: relative;
  }
  .router-link-exact-active{
    & + .close{
      display: block;
    }
  }
  .close{
    display: none;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    width: 10px;
    height: 10px;
    cursor: pointer;
    &::before, &::after{
      content: '';
      position: absolute;
      top: 4px;
      width: 100%;
      height: 2px;
      background: #666;
    }
    &::after{
      transform: rotate(45deg);
    }
    &::before{
      transform: rotate(-45deg);
    }
  }
}

.mask{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
}
.menu{
  position: fixed;
  padding: 4px 10px;
  background: white;
  box-shadow: 0 5px 5px rgba(0,0,0,.4);
  border-radius: 5px;
  font-size: 14px;
  li{
    line-height: 1.6;
    cursor: pointer;
  }
}
</style>