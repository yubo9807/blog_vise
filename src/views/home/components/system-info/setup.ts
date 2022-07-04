// vue
import { onMounted, onUnmounted, reactive, ref } from 'vue';

// api
import { api_getSystemInfo, api_getSystemInfoDynamic } from '@/api/os';



export default () => {

  // 系统信息
  const info = reactive({
    model: '',
    type: '',
    version: '',
    uptime: 0,
  });


  (async function() {
    const response = await api_getSystemInfo();
    if (response.code === 200) {
      const { cpu, arch, type, release, version, uptime } = response.data;

      info.model = cpu.model + ' ' + arch;
      info.type = type + ' ' + release;
      info.version = version;
      info.uptime = uptime;
    }
  }())
  

  // 系统运行时间，每秒钟变化一次
  let uptimeTimer = null;
  onMounted(() => {
    uptimeTimer = setInterval(() => {
      info.uptime++;
    }, 1000);
  })
  onUnmounted(() => {
    clearInterval(uptimeTimer);
  })
  


  // 折线图至少有两个点才能形成一条线，所以要先有一个起始点
  const loadList = ref([0]);  // CPU 负载
  const memoryList = ref([0]);  // 内存压力

  dynamicSystemInfo();
  /**
   * 获取动态数据
   */
  async function dynamicSystemInfo() {
    const response = await api_getSystemInfoDynamic();
    if (response.code === 200) {
      const { freemem, totalmem, loadavg } = response.data;

      // 对数据长度做一定限制
      if (loadList.value.length > 10) {
        loadList.value.shift();
        memoryList.value.shift();
      }

      loadList.value.push(loadavg[2]);
      memoryList.value.push((totalmem - freemem) / totalmem);

    }
  }


  // 隔一段时间获取下数据
  let dynamicTimer = null;
  onMounted(() => {
    dynamicTimer = setInterval(dynamicSystemInfo, 5000);
  })
  onUnmounted(() => {
    clearInterval(dynamicTimer);
  })
  


  return {

    // 系统信息
    info,

    // 关于图表的数据
    ...{ loadList, memoryList },

  }
}
