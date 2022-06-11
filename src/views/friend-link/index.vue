<template>
  <div class="blacklist">
    <el-table :data="tableData">
      <el-table-column label="序号" type="index" width="60" />
      <el-table-column show-overflow-tooltip label="友链名称" prop="name" />
      <el-table-column show-overflow-tooltip label="友链地址" prop="link" min-width="160">
        <template #default="scope">
          <el-link type="primary" :href="scope.row.link" target="_blank">{{ scope.row.link }}</el-link>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip label="介绍" prop="introduce" min-width="160" />
      <el-table-column show-overflow-tooltip label="备注" prop="remark" min-width="140" />
      <el-table-column show-overflow-tooltip label="创建时间" prop="create_time" min-width="160" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-link @click="deleteFriendLink(scope.row)">删除</el-link>
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

<style>

</style>