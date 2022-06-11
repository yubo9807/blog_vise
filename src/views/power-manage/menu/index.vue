<template>
  <div>
  <el-table ref="menuTableRef" :data="menuData" row-key="id">
    <el-table-column prop="title" label="菜单名称" />
    <el-table-column label="禁用">
      <template #default="scope">
        <el-link :underline="false" type="danger" v-if="scope.row.disable">是</el-link>
        <el-link :underline="false" type="info" v-else>否</el-link>
      </template>
    </el-table-column>
    <el-table-column label="侧边栏显示">
      <template #default="scope">
        <el-link :underline="false" type="info" v-if="scope.row.hidden">否</el-link>
        <el-link :underline="false" type="success" v-else>是</el-link>
      </template>
    </el-table-column>
    <el-table-column label="添加到缓存">
      <template #default="scope">
        <el-link :underline="false" type="info" v-if="scope.row.no_cache">否</el-link>
        <el-link :underline="false" type="success" v-else>是</el-link>
      </template>
    </el-table-column>
    <el-table-column label="直接显示子菜单">
      <template #default="scope">
        <el-link :underline="false" type="success" v-if="scope.row.always_show">是</el-link>
        <el-link :underline="false" type="info" v-else>否</el-link>
      </template>
    </el-table-column>
    <el-table-column label="操作" class-name="operation">
      <template #default="scope">
        <el-icon class="setting">
          <el-icon-setting @click="setting(scope.row)" />
        </el-icon>
        <el-icon class="mouse">
          <el-icon-sortdown @click="sortdown(scope.row)" />
        </el-icon>
        <el-icon class="mouse">
          <el-icon-sortup @click="sortup(scope.row)" />
        </el-icon>
      </template>
    </el-table-column>
  </el-table>

  <SetMenuConfig ref="setMenuConfig" :config="menuConfig" />
  
  </div>
</template>

<script lang='ts'>
import SetMenuConfig from './SetMenuConfig/index.vue'
import init from './initData';
import operation from './operation';
export default {
  name: 'PowerManageMenu',
  components: {
    SetMenuConfig
  },
  setup() {
    return {
      ...init(),
      ...operation(),
    }
  }
}
</script>

<style lang="scss" scoped>
.operation{
  .el-icon{
    cursor: pointer;
    &.setting{
      margin-right: 20px;
    }
    &.mouse{
      display: none;
    }
  }
  &:hover{
    .el-icon.mouse{
      display: inline-block;
    }
  }
}
</style>>
