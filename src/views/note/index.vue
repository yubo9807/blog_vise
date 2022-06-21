<template>
  <div class="note-page">
    <el-link v-show="isBackBtn" class="back" :underline="false" @click="$router.go(-1)">
      <i class="iconfont">&#xe01d;</i>&nbsp;
      <span>返回</span>
    </el-link>
    <ul v-show="fileList.length > 0" class="file-list">
      <li v-for="(item, index) in fileList" :key="index" @click="getFileListOrContent(item.path)">
        <i v-show="item.isFile" class="iconfont icon-file">&#xe016;</i>
        <i v-show="!item.isFile" class="iconfont icon-folder">&#xe017;</i>
        <p class="file-name">{{ item.name }}</p>
      </li>
      <li class="add-file">
        <i class="iconfont icon-add-file">&#xe010;</i>
        <div class="add-file-box">
          <p>添加文件夹</p>
          <p>添加文件</p>
        </div>
      </li>
    </ul>
    <div class="wrap">
      <div class="content" v-html="fileAttr.content"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import setup from './setup';
export default defineComponent({
  setup
})
</script>

<style lang="scss" scoped>
@import './module.scss';
</style>