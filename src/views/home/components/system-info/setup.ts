import { api_getSystemInfo, api_getSystemInfoDynamic } from '@/api/os';
import { onMounted, onUnmounted, reactive, ref } from 'vue';


export default () => {

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
  
  onMounted(() => {
    setInterval(() => {
      info.uptime++
    }, 1000)
  })
  

  const load = ref(0);
  const memory = ref(0);

  async function dynamicSystemInfo() {
    const response = await api_getSystemInfoDynamic();
    if (response.code === 200) {
      const { freemem, totalmem, loadavg } = response.data;
      load.value = loadavg[2];
      memory.value = (totalmem - freemem) / totalmem;
    }
  }

  dynamicSystemInfo();

  let timer = null;
  onMounted(() => {
    timer = setInterval(dynamicSystemInfo, 5000);
  })
  onUnmounted(() => {
    clearInterval(timer);
  })
  

  return {
    info,

    load,
    memory,
  }
}
