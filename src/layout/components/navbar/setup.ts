import { useStore } from 'vuex';
import { OVERDUE } from '@/store/modules/user';
import store from '@/store';
import { ElMessageBox } from 'element-plus';

export default () => {
  const $store = useStore();

    function putAwaySlider() {
      const putAway = $store.state.slider.putAway
      store.commit('slider/set_putAway', !putAway);
    }

    function lognOut() {
      ElMessageBox.confirm('确认退出当前帐号', '警告', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(async () => {
        store.commit('user/set_token', { type: OVERDUE });
        store.commit('user/set_login', 2);
        store.commit('user/set_info', {});
      }).catch(() => {})
    }

    return {
      putAwaySlider,
      lognOut
    }
}