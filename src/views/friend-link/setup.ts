import { api_deleteFriendLink, api_getFriendLinklist } from '@/api/friend-link';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { dateFormater } from '@/utils/date';

export default () => {

  const tableData = ref([]);
  
  initData();
  async function initData() {
    const response = await api_getFriendLinklist();
    if (response.code === 200) {
      const { data } = response;
      data.forEach(val => {
        val.create_time = dateFormater(val.create_time * 1000);
      });
      tableData.value = data;
    }
  }

  function deleteFriendLink(row) {
    ElMessageBox.confirm('确认删除该友链？', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      const response = await api_deleteFriendLink({ id: row.id });
      if (response.code === 200) {
        ElMessage.success('删除成功');
        initData();
      }
    }).catch(() => {})
  }

  return {
    tableData,

    deleteFriendLink
  }
}