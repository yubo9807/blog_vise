// vue
import { getCurrentInstance, onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

// api
import { api_getAccessRecordList } from '@/api/access';

// utils
import { getNowDayZeroTimestamp } from '@/utils/date';

// echarts
import * as echarts from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import { TitleComponent, GridComponent, TooltipComponent } from 'echarts/components';
import option from './option';

echarts.use([
  TitleComponent,
  GridComponent,
  TooltipComponent,
  LineChart,
  CanvasRenderer
]);



export default () => {

  const current = getCurrentInstance();
  const $router = useRouter();

  let chart = null;
  onMounted(() => {

    // 初始化图表
    chart = echarts.init((current.refs.chart as HTMLElement));

    // 点击图标跳转页面
    chart.on('click', event => {
      const year = new Date().getFullYear();
      $router.push({ name: 'Access', query: { log: year + '-' + event.name.trim() + '.log' } });
    })

  })


  
  const visitorsNumber = ref(0);  // 访问次数

  /**
   * 初始化数据
   */
  (async function() {
    const dayDuration = 1000 * 60 * 60 * 24;

    // 获取六天前 00:00:00 的时间戳
    const weekAgo = getNowDayZeroTimestamp() - dayDuration * 6;
    const startTime = Math.floor(new Date(weekAgo).getTime() / 1000);

    // 获取数据
    const response = await api_getAccessRecordList({ startTime });
    if (response.code === 200) {
      const { data } = response;

      // 近七天日期生成 key 值
      const obj = {}
      for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - dayDuration * i);
        const key = date.getMonth() + 1 + '-' + date.getDate();
        obj[key] = 0;
      }
      
      // 给对象重新赋值
      data.forEach(val => {
        const date = new Date(val.accessTime * 1000);
        val.date = date.getMonth() + 1 + '-' + date.getDate();
        obj[val.date] = obj[val.date] + 1;
        visitorsNumber.value += 1;
      })

      const dateList = Object.keys(obj);
      const visitorsList: number[] = Object.values(obj);

      // 横坐标：第一个字符左对齐，最后一个字符右对齐
      const emptyStr = '      ', len = dateList.length;
      dateList[0] = emptyStr + dateList[0];
      dateList[len - 1] = dateList[len - 1] + emptyStr;
      
      // 计算图表左边需要占用宽度
      const leftWidth = (Math.max(...visitorsList) + '0').length * 10;

      // 渲染图表
      option.grid.left = leftWidth + 'px';
      option.xAxis.data = dateList;
      option.series[0].data = visitorsList;
      chart.setOption(option);

    }
  }())



  return {
    visitorsNumber
  }

}
