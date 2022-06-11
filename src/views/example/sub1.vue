<template>
  <div>
    sub-1
    <input type="text" />
    <RouterCache />
  </div>
</template>

<script>
import RouterCache from '@/components/RouterCache/index.vue';
export default {
  name: 'ExampleSub1',
  components: {
    RouterCache
  }
}
</script>
