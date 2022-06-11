import { watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter, useRoute } from 'vue-router';

export default () => {
  const $store = useStore();
  const $router = useRouter();
  const $route = useRoute();

  (async () => {
    const token = $store.state.user.token;
    if (!token) {
      $router.replace('/login');
    }
  })()
  // 监听状态，处理登录状况
  watch(
    () => $store.state.user.token,
    (value) => {
      if (!value) {
        const redirectHref = $route.path;
        $router.replace(`/login?redirect=${redirectHref}`);
      }
    }
  )

  return {}
}