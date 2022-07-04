<template>
  <div class="home-page">
    <div class="box">
      <ChartAccessRecord />
    </div>
    <SystemInfo class="box" />
    <div class="box">
      <ChartRedis />
    </div>
  </div>
</template>

<script lang='ts'>
import { defineAsyncComponent } from 'vue';
import SystemInfo from './components/system-info/index.vue';
import Loading from '@/components/loading/index.vue';

const ChartAccessRecord = defineAsyncComponent({
  loader: () => import('./components/chart-access-record/index.vue'),
  loadingComponent: Loading,
})
const ChartRedis = defineAsyncComponent({
  loader: () => import('./components/chart-redis/index.vue'),
  loadingComponent: Loading,
})

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
  padding: 20px;
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,.2);
  margin-bottom: 14px;
}
</style>