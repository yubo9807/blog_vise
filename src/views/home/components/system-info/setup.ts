import { api_getSystemInfo } from '@/api/os';
import { ref } from 'vue';
import { getTimeDistance } from '@/utils/date';


export default () => {

  const list = ref([]);

  (async function () {
    const response = await api_getSystemInfo();
    const arr = [];
    if (response.code === 200) {
      const { arch, cpu, freemem, totalmem, loadavg, release, type, uptime, version } = response.data;
      arr.push({ name: 'CPU 型号', value: cpu.model + ' ' + arch });
      arr.push({ name: '操作系统', value: type + ' ' + release });
      arr.push({ name: '内核版本', value: version });
      arr.push({ name: 'CPU 负载', value: loadavg[0] });
      arr.push({ name: '内存压力', value: parseInt('' + ((totalmem - freemem) / totalmem) * 100) + '%' });
      arr.push({ name: '开机时间', value: getTimeDistance(uptime) });
      list.value = arr;
    }
  }())

  return {
    list
  }
}
