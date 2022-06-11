import { ref, watch } from 'vue';
import { useStore } from 'vuex';

export default () => {
  const $store = useStore();
  const compName = ref();
  
  // 监听要隐藏的菜单，发生变化即告诉子组件重新渲染
  // 为什么不在子组件直接监听？子组件是一个递归组件，要监听很多次；在父组件只需监听一次
  watch(
    () => $store.state.slider.hiddenSlider,
    (newValue) => {
      compName.value = newValue;
    },
    { deep: true }
  );

  return {
    compName
  }
}