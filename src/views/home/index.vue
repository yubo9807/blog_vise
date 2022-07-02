<template>
  <div class="home-page">
    <SystemInfo class="box" />
    <ChartAccessRecord class="box" />
    <ChartRedis class="box" />
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent } from 'vue';
import SystemInfo from './components/system-info/index.vue';
import { ElLoading } from 'element-plus';
const ChartAccessRecord = defineAsyncComponent({
  loader: () => import('./components/chart-access-record/index.vue'),
  loadingComponent: ElLoading,
})
const ChartRedis = defineAsyncComponent(() => import('./components/chart-redis/index.vue'))

export default {
  // name: 'Home',
  components: {
    SystemInfo,
    ChartAccessRecord,
    ChartRedis
  }
}
</script>

<style lang='scss' scoped>
.box{
  height: 400px;
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
  margin-bottom: 14px;
}
</style>