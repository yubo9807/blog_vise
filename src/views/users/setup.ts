import { api_getUserList } from '@/api/users';
import { ref } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import env from '~/env_variable';
import { dateFormater } from '@/utils/date';

export default () => {

  const tableData = ref([]);
  
  initData();
  async function initData() {
    const response = await api_getUserList();
    if (response.code === 200) {
      const list = response.data;
      list.forEach(val => {
        val.create_time = dateFormater(val.create_time * 1000);
      })
      tableData.value = list;
    }
  }

  function deleteBlacklistIP(row) {
    ElMessageBox.confirm('确认注销当前用户', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      // const response = await api_deleteBlacklistIP({ id: row.id })
      // if (response.code === 200) {
      //   ElMessage.success('已删除');
      //   initData();
      // }
    }).catch(() => {})
  }

  return {
    tableData,

    deleteBlacklistIP
  }
}