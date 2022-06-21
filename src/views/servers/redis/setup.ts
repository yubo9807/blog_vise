import { api_clearMemoryRedis, api_getMemoryRedis } from '@/api/memory';
import { reactive, ref, watch } from 'vue';
import { dateFormater, getTimeDistance } from '@/utils/date';
import { calculateByte } from '@/utils/number';
import { useRoute } from 'vue-router';
import { getLSUsedSpace } from '@/utils/object';
import { ElMessage, ElMessageBox } from 'element-plus';

export default () => {

  const table = ref([]);
  const total = reactive({
    length: 0,
    size: '0Byte',
  })

  let backups = null;


  const $route = useRoute();

  watch(() => $route.query.path, async(value: string) => {
    if (!backups) await initData();
    if (value) table.value = [ backups.find(val => val.key === value) ];
    else initData();
  }, { immediate: true })
  
  async function initData() {
    const response = await api_getMemoryRedis();
    if (response.code === 200) {
      const { data, size, length } = response.data;
      total.length = length;
      total.size = calculateByte(size);

      const list = [];
      for (const key in data) {
        const { createTime, overTime, count, value } = data[key];
        list.push({
          key,
          createTime: dateFormater(createTime),
          cacheTime: overTime === null ? Infinity : getTimeDistance(overTime / 1000),
          overTime: overTime === null ? '-' : dateFormater(createTime + overTime),
          count,
          value: JSON.stringify(value),
          size: getLSUsedSpace(data[key]) + key.length,
        });
      }
      table.value = list;
      backups = list;
    }
  }

  function clearCache() {
    ElMessageBox.confirm('确认清空 Redis 缓存？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const response = await api_clearMemoryRedis();
      if (response.code === 200) {
        ElMessage.success('操作成功');
        initData();
      }
    }).catch(() => {})
  }

  return {
    table,
    total,
    clearCache,
  }
}