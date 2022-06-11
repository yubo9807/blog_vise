<template>
  <div class="logo">
    <img src="@/assets/images/logo.png" alt="">
    <h1 v-if="!$store.state.slider.putAway">&nbsp;{{ SYSTEM_NAME }}</h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import env from '~/env_variable';

export default defineComponent({
  setup() {
    return {
      SYSTEM_NAME: env.SYSTEM_NAME
    }
  },
})
</script>


<style lang="scss" scoped>
.logo{
  text-align: center;
  line-height: 40px;
  img{
    height: 26px;
    vertical-align: middle;
  }
  h1{
    display: inline-block;
    font-size: 16px;
  }
}
</style>