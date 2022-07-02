import { api_getAccessRecordList } from '@/api/access';
import { api_getFileListOrContent } from '@/api/file';
import { dateFormater } from '@/utils/date';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default () => {

  const $route = useRoute();
  const $router = useRouter();


  const menu = ref([]);

  (async function () {
    const response = await api_getFileListOrContent({ path: '/access-record' });
    if (response.code === 200) {
      const { data } = response;
      menu.value = response.data.reverse();
      
      const log = $route.query.log;
      if (log) {
        getNowDayData((log as string).replace('.log', ''))
      } else {
        $router.replace({ query: { log: data[0].name }});
      }
    }
  }())

  watch(() => $route.query.log, value => {
    let str = value ? value : menu.value[0].name;
    getNowDayData(str.replace('.log', ''));
  })


  const list = ref([]);

  /**
   * 获取当天访问数据
   */
  async function getNowDayData(day: string) {
    const hour = 1000 * 60 * 60;
    const startTime = new Date(day).getTime() - hour * 8;
    const endTime = startTime + hour * 24 - 1;
    const response = await api_getAccessRecordList({ startTime: startTime / 1000, endTime: endTime / 1000 });
    if (response.code === 200) {
      const { data } = response;
      data.forEach(val => {
        val.url = decodeURI(val.url);
        val.accessTime = dateFormater(val.accessTime * 1000);
      })
      list.value = data.reverse();
    }
  }

  return {
    menu,
    list,
  }

}
