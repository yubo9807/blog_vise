import { api_getAccessRecordList } from "@/api/access";
import { getNowDayZeroTimestamp } from "@/utils/date";
import { getCurrentInstance, onMounted, ref } from "vue";
import { init } from 'echarts';
import option from './option';
import { useRouter } from 'vue-router';

export default () => {
  const current = getCurrentInstance();
  const $router = useRouter();

  let chart = null;
  onMounted(() => {
    chart = init((current.refs.chart as HTMLElement));

    chart.on('click', event => {
      const year = new Date().getFullYear();
      $router.push({ name: 'Access', query: { log: year + '-' + event.name + '.log' } });
    })
  })

  
  const visitorsNumber = ref(0);

  initData();
  async function initData() {
    const day = getNowDayZeroTimestamp();
    const weekAgo = day - 1000 * 60 * 60 * 24 * 6;
    const startTime = Math.floor(new Date(weekAgo).getTime() / 1000);
    const response = await api_getAccessRecordList({ startTime });
    if (response.code === 200) {
      const { data } = response;

      const obj = {}
      for (let i = 6; i >= 0; i--) {
        const date = new Date(Date.now() - 1000 * 60 * 60 * 24 * i);
        const key = date.getMonth() + 1 + '-' + date.getDate();
        obj[key] = 0;
      }
      
      data.forEach(val => {
        const date = new Date(val.accessTime * 1000);
        val.date = date.getMonth() + 1 + '-' + date.getDate();
        obj[val.date] = obj[val.date] + 1;
        visitorsNumber.value += 1;
      })
      
      option.xAxis.data = Object.keys(obj);
      option.series[0].data = Object.values(obj);
      chart.setOption(option);
    }
  }

  return {
    visitorsNumber
  }
}
