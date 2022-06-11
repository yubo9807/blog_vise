/**
 * 想有过渡动画，必须是单个标签节点，注释也不行
 */
<template>
  <RouterCache />
</template>

<script>
import RouterCache from '@/components/RouterCache/index.vue';
export default {
  name: 'Example',  // name 与 $route.name 一致，有缓存
  components: {
    RouterCache,  // == router-view  封装过的组件，可以对页面缓存进行统一管理
  }
}
</script>


