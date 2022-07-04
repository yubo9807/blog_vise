// vue
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

// api
import { api_getAccessRecordList } from '@/api/access';
import { api_getFileListOrContent } from '@/api/file';

// utils
import { dateFormater } from '@/utils/date';



export default () => {

  const $route = useRoute();
  const $router = useRouter();


  const menuList = ref([]);  // 左侧菜单

  (async function () {
    const response = await api_getFileListOrContent({ path: '/access-record' });
    if (response.code === 200) {
      const { data } = response;
      menuList.value = response.data.reverse();
      
      const log = $route.query.log;
      if (log) {
        getNowDayData((log as string).replace('.log', ''))
      } else {
        $router.replace({ query: { log: data[0].name }});
      }
    }
  }())



  const accessList = ref([]);  // 访问数据
  let backupsAccessList = null;  // 备份访问数据，方便搜索调用

  // 监听路由变化，请求对应日志
  watch(() => $route.query.log, value => {
    let str = value ? value : menuList.value[0].name;
    getNowDayData(str.replace('.log', ''));
  })

  /**
   * 获取当天访问数据
   */
  async function getNowDayData(day: string) {
    const hour = 1000 * 60 * 60;
    const startTime = new Date(day).getTime() - hour * 8;
    const endTime = startTime + hour * 24;
    const params = {
      startTime: startTime / 1000,
      endTime: endTime / 1000 - 1,
    }
    const response = await api_getAccessRecordList(params);
    if (response.code === 200) {
      const { data } = response;
      data.forEach(val => {
        val.url = decodeURI(val.url);
        val.accessTime = dateFormater(val.accessTime * 1000);
      })
      backupsAccessList = data.reverse();
      accessList.value = Object.assign([], backupsAccessList);
    }
  }



  const searchValue = ref('');  // 搜索条件

  // 监听搜索条件，重新渲染数据
  watch(() => searchValue.value, value => {
    if (value) accessList.value = backupsAccessList.filter(val => val.url.includes(value));
    else accessList.value = backupsAccessList;
  })



  return {
    menuList,
    accessList,

    searchValue,
  }

}
