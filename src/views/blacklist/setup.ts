import { api_deleteBlacklistIP, api_getBlacklist } from '@/api/blacklist';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';

export default () => {

  const tableData = ref([]);
  
  initData();
  async function initData() {
    const response = await api_getBlacklist();
    if (response.code === 200) {
      tableData.value = response.data;
    }
  }

  function deleteBlacklistIP(row) {
    ElMessageBox.confirm('确认将此 IP 移出黑名单？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const response = await api_deleteBlacklistIP({ id: row.id })
      if (response.code === 200) {
        ElMessage.success('已删除');
        initData();
      }
    }).catch(() => {})
  }

  return {
    tableData,

    deleteBlacklistIP
  }
}