import { createApp } from 'vue';
import router from './router';
import store from './store';
import App from './App.vue';
import './styles/index.scss';
import env from '~/env_variable';
import { Setting, SortUp, SortDown } from '@element-plus/icons-vue';
import powerControl from './power-control';
import elementImport from './element-import';


const app = createApp(App).use(router).use(store);
elementImport(app);

app.config.globalProperties.$env = env;

app.component('el-icon-setting', Setting);
app.component('el-icon-sortup', SortUp);
app.component('el-icon-sortdown', SortDown);

app.mount('#app');

// 路由权限守卫
powerControl();
