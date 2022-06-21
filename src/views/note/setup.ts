import { api_getFileListOrContent } from '@/api/file';
import { isType } from '@/utils/judge';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default () => {
  const $route = useRoute();
  const $router = useRouter();

  // 进入页面要完成：
  if (!$route.query.path) {
    $router.replace({ query: { path: '/note' }});
  } else {
    getFileListOrContent($route.query.path);
  }

  const isBackBtn = ref(true);

  // 监听 router 变化，请求数据
  watch(() => $route.query.path, value => {
    isBackBtn.value = value === '/note' ? false : true;
    getFileListOrContent(value);
  })

  const fileList = ref([]);
  const fileAttr = ref({});

  /**
   * 获取文件列表
   */
  async function getFileListOrContent(path) {
    $router.push({ query: { path }});
    const response = await api_getFileListOrContent({ path });
    if (response.code === 200) {
      const { data } = response;
      if (isType(data) === 'array') {
        fileList.value = data;
        fileAttr.value = {};
      } else {
        fileList.value = [];
        fileAttr.value = data;
      }
    }
  }

  return {
    // 返回按钮显示
    isBackBtn,

    // 文件数据
    ...{ fileList, fileAttr, getFileListOrContent }
  }
}