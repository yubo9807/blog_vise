import { getCurrentInstance, onMounted, ref } from 'vue';
import { init } from 'echarts';
import option from './option';
import { api_getMemoryRedis } from '@/api/memory';
import { getLSUsedSpace } from '@/utils/object';
import { dateFormater, getTimeDistance } from '@/utils/date';
import { useRouter } from 'vue-router';

export default () => {
  const current = getCurrentInstance();
  const $router = useRouter();
  
  let chart = null;
  onMounted(() => {
    chart = init((current.refs.chart as HTMLElement));

    chart.on('click', event => {
      $router.push({ name: 'ServersRedis', query: { path: event.name } });
    })
  })


  const totalSize = ref(0);

  initData();
  async function initData() {
    const response = await api_getMemoryRedis();
    if (response.code === 200) {
      const { data, size } = response.data;
      totalSize.value = size;

      for (const prop in data) {
        data[prop].size = getLSUsedSpace(data[prop]) + prop.length;
      }

      option.xAxis.data = Object.keys(data);
      const sizeArr = [], cacheTimeArr = [], overTimeArr = []
      Object.values(data).forEach((val: any) => {
        sizeArr.push(val.size);

        const cacheTime = val.overTime ? getTimeDistance(val.overTime / 1000) : '不过期';
        cacheTimeArr.push(cacheTime);

        const overTime = val.overTime ? dateFormater(val.createTime + val.overTime, 'MM/DD hh:mm:ss') : ''
        overTimeArr.push(overTime);
      });

      option.series[0].data = cacheTimeArr;
      option.series[1].data = overTimeArr;
      option.series[2].data = sizeArr;

      chart.setOption(option);
    }
  }


  return {
    totalSize
  }
}
