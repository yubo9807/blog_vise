import { api_getFileListOrContent } from '@/api/file';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { calculateByte } from '@/utils/number';

export default () => {
  const $router = useRouter();
  const $route = useRoute();
  
  const fileList = ref([]);
  
  getFileList();
  async function getFileList() {
    const { log } = $route.query;
    const response = await api_getFileListOrContent({ path: '/logs' })
    if (response.code === 200) {
      const list = response.data.reverse();
      fileList.value = list;
      $router.replace({ query: { log: log || list[0].name } })
      
      const queryLog = list.find(val => val.name === log);
      queryLog ? getFileContent(queryLog.path) : getFileContent(list[0].path);
    }
  }
  
  const fileAttr = ref({});
  
  async function getFileContent(path) {
    const response = await api_getFileListOrContent({ path })
    if (response.code === 200) {
      const { data } = response;
      fileAttr.value = data;
      $router.replace({ query: { log: data.name } })
    }
  }

  const newline = ref(false);

  return {
    fileList,
    fileAttr,
    getFileContent,
    calculateByte,

    newline
  }
}
