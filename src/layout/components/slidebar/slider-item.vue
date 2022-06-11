<template>
  <el-sub-menu v-if="route.children && route.children.length > 0" :index="route.name">
    <template #title>
      <el-icon>
        <i class="iconfont" v-html="route.meta.icon"></i>
      </el-icon>
      <span>{{ route.meta.title }}</span>
    </template>
    <SliderItem v-for="item in route.children" :key="item.name" :route="item" />
  </el-sub-menu>

  <el-menu-item v-else :index="route.name" @click="$router.push({ name: route.name })">
    <el-icon>
      <i class="iconfont" v-html="route.meta.icon"></i>
    </el-icon>
    <span>{{ route.meta.title }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SliderItem',
  props: {
    route: {
      type: Object,
      default: () => new Object()
    },
  }
}
</script>

<style lang="scss" scoped>
a{
  display: inline-block;
  width: 100%;
  height: 100%;
  color: #eee;
}
</style>