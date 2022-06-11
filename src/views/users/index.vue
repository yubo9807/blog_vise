<template>
  <div class="blacklist">
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column show-overflow-tooltip label="用户名" prop="name" />
      <el-table-column show-overflow-tooltip label="角色" prop="role" />
      <el-table-column show-overflow-tooltip label="邮箱" prop="mail" min-width="160" />
      <el-table-column show-overflow-tooltip label="注册时间" prop="create_time" min-width="160" />
      <el-table-column show-overflow-tooltip label="备注" prop="remark" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-link @click="deleteBlacklistIP(scope.row)">注销</el-link>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import setup from './setup';
export default {
  setup
}
</script>

<style lang="scss" scoped>
</style>