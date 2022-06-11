<template>
  <div class="app-wrapper" :class="[$store.state.slider.putAway && 'put-away']">
    <aside>
      <Logo />
      <Slidebar :list="routes" :hiddenName="compName" />
    </aside>
    <section>
      <Navbar class="nav" />
      <Tabs />

      <!-- transition 动画要求切换 view 必须是单个标签 -->
      <transition name="slide-fade" mode="out-in">
        <RouterCache class="view" />
      </transition>

    </section>
  </div>
  
</template>

<script lang='ts'>
import RouterCache from '@/components/router-cache/index.vue';
import Slidebar from './components/slidebar/index.vue';
import Navbar from './components/navbar/index.vue';
import Logo from './components/logo/index.vue';
import Tabs from './components/tabs/index.vue';

import watchSlider from './ts/watch-slider';
import watchLogin from './ts/watch-login';
import disposeRouter from './ts/dispose-router';

export default {
  components: {
    Slidebar,
    Navbar,
    Logo,
    RouterCache,
    Tabs
  },
  setup() {
    return {
      ...disposeRouter(),
      ...watchSlider(),
      ...watchLogin()
    }
  }
}
</script>

<style lang='scss' scoped>
.app-wrapper{
  display: flex;
  aside, section{
    height: 100vh;
  }
  aside{
    position: fixed;
    width: 200px;
    transition: width .3s;
    box-shadow: 4px 0 4px rgba(0,0,0,.1);
    border-right: 1px solid white;
    background: rgba(245,245,250,.6);
    backdrop-filter: blur(5px);
  }
  section{
    width: calc(100% - 200px);
    margin-left: 200px;
    transition: width .3s, margin .3s;
  }
  &.put-away{
    aside{
      width: 64px;
    }
    section{
      width: calc(100% - 64px);
      margin-left: 64px;
    }
  }
}

.view{
  // width: calc(100% - 20px);
  padding: 10px 14px;
  box-sizing: border-box;
}

.slide-fade-enter-active {
  transition: all .4s ease-out;
}

.slide-fade-leave-active {
  transition: all .4s ease-out;
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>