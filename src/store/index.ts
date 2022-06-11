import { Store } from 'vuex';
import slider from './modules/silder';
import tabs from './modules/tabs';
import user from './modules/user';

const store: any = new Store({
  modules: {
    slider,
    tabs,
    user
  }
})

export default store;