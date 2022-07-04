// vue
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// api
import { api_getMemoryRedis } from '@/api/memory';

// utils
import { getLSUsedSpace } from '@/utils/object';
import { dateFormater, getTimeDistance } from '@/utils/date';
import { calculateByte } from '@/utils/number';

// echarts
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent } from 'echarts/components';
import option from './option';

echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  BarChart,
  CanvasRenderer
]);



export default () => {

  const current = getCurrentInstance();
  const $router = useRouter();
  
  let chart = null;
  onMounted(() => {

    // 初始化图表
    chart = echarts.init((current.refs.chart as HTMLElement));

    // 点击图表跳转页面
    chart.on('click', event => {
      $router.push({ name: 'ServersRedis', query: { path: event.name } });
    })

  })



  const totalSize = ref('0');  // 占用内存总大小

  (async function() {
    const response = await api_getMemoryRedis();
    if (response.code === 200) {
      const { data, size } = response.data;
      totalSize.value = calculateByte(size);

      // 数据分类
      const keys = [], sizeArr = [], cacheTimeArr = [], overTimeArr = [];
      for (const prop in data) {
        const value = data[prop];

        keys.push(unescape(prop));
        sizeArr.push(getLSUsedSpace(value) + prop.length);

        const cacheTime = value.overTime ? getTimeDistance(value.overTime / 1000) : '不过期';
        cacheTimeArr.push(cacheTime);

        const overTime = value.overTime ? dateFormater(value.createTime + value.overTime, 'MM/DD hh:mm:ss') : ''
        overTimeArr.push(overTime);
      }

      // 计算图表左边需要占用宽度
      const leftWidth = (Math.max(...sizeArr) + '0').length * 10;
      
      // 渲染图表
      option.grid.left = leftWidth + 'px';
      option.xAxis.data = keys;
      option.series[0].data = cacheTimeArr;
      option.series[1].data = overTimeArr;
      option.series[2].data = sizeArr;
      chart.setOption(option);

    }
  }())



  return {
    totalSize
  }

}
