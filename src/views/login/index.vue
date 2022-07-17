<template>
  <div class="logo-wrap">
    <h1 class="title">{{ SYSTEM_NAME }}</h1>
    <el-form :model="form">
      <el-form-item label="帐号">
        <el-input v-model="form.username" placeholder="请输入帐号" />
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password" placeholder="请输入密码" type="password" @keyup.enter="signIn" />
      </el-form-item>
    </el-form>
    <el-button @click="visitorSignIn">访客登录</el-button>
    <el-button type="primary" @click="signIn">登录</el-button>
  </div>
</template>

<script lang='ts'>
import setup from './setup';
import { defineComponent } from 'vue';

export default defineComponent({
  setup
})
</script>

<style lang="scss" scoped>
.logo-wrap{
  margin: 100px auto;
  padding: 20px;
  max-width: 320px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,.1);
  .title{
    font-size: 1.4em;
    margin-bottom: 20px;
  }
}
</style>