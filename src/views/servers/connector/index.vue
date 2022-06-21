<template>
  <div class="logs-page clearfix">

    <ul class="list">
      <li
        v-for="(item, index) in fileList"
        :key="index"
        :class="$route.query.log === item.name ? 'active' : ''"
        @click="getFileContent(item.path)"
      >
        <i class="iconfont">&#xe610;</i>&nbsp;
        <span>{{ item.name }}</span>
      </li>
    </ul>

    <div class="wrap">
      <div class="head">
        <span>{{ calculateByte(fileAttr.size) }}</span>
        <el-link type="primary" :underline="false" @click="newline = !newline">自动换行</el-link>
      </div>
      <div ref="content" class="content">
        <pre :class="[newline ? 'newline' : '']">{{ fileAttr.content }}</pre>
      </div>
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
.logs-page{
  .list, .wrap{
    float: left;
  }
  .list{
    width: 140px;
    line-height: 1.8;
    max-height: calc(100vh - 120px);
    overflow-y: auto;
    > li{
      cursor: pointer;
      &.active{
        color: var(--el-color-primary);
      }
      &:not(:last-child){
        border-bottom: 1px solid #eee;
      }
    }
  }
  .wrap{
    width: calc(100% - 140px);
    font-size: 12px;
    .head{
      display: flex;
      justify-content: space-between;
      margin-bottom: 6px;
    }
    .content{
      width: 100%;
      height: calc(100vh - 140px);
      overflow: auto;
      border-radius: 4px;
      padding: 10px;
      background: #282c34;
      box-sizing: border-box;
      padding-top: 0;
      color: white;
      > pre{
        padding-bottom: 200px;
        &.newline{
          white-space: pre-wrap;
          word-break: break-all;
        }
      }
    }
  }
}
</style>