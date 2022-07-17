import axios, { AxiosStatic, AxiosResponse, AxiosRequestConfig } from 'axios';
import { ElMessage, ElNotification, ElMessageBox } from 'element-plus';
import { axiosRetry } from '@/utils/network';
import env_variable from '~/env_variable';
import { OVERDUE } from '@/store/modules/user';
import store from '@/store';

interface SateConfig extends AxiosRequestConfig {
  noTips?: boolean // 为 true 时取消全局拦截报错
}
interface SateResponse extends AxiosResponse {
  config: SateConfig
}
interface SateAxios extends AxiosStatic {
  (config?: SateConfig)
}


const instance = axios.create({
  baseURL: env_variable.BASE_API,
  timeout: 5000
})

// 响应错误时重新发起请求
axiosRetry(instance, {
  retries: 3,
  retryDelay: 2000,
  retryTips: () => {
    ElMessage.closeAll();
    ElMessage.info('网络可能在开小差，正在请求重试');
  }
})

// 请求拦截器
instance.interceptors.request.use(async(config) => {
  // 有 token 的话将其放在 headers 中
  const authorization = sessionStorage.getItem('token');
  if (authorization) {
    config.headers.Authorization = authorization;
  }
  return config;
})

// 响应拦截器
instance.interceptors.response.use((response: any) => {
  const { status, data, headers } = response;

  if (headers && headers['content-type'].includes('text/html;')) {
    ElMessage.error('请求地址错误');
    return Promise.reject(response);
  }

  if (status) { // 状态码正常
    unifiedError(response);
    return data;
  }

  return response;
}, error => {
  const { response, message } = error;

  if (response) {
    unifiedError(response);
    return Promise.resolve(response);
  }
  
  ElNotification.closeAll();
  ElNotification({
    title: '服务器连接错误',
    message: '错误原因：连接超时/网络断开/服务器忙没响应'
  })

  // 返回统一数据格式，不会导致代码取不到 code 而报错
  return Promise.resolve({
    code: 500,
    msg: message || '服务器连接错误'
  })

})

export default (instance as SateAxios);



/**
 * 统一报错
 * @param data
 * @param config
 */
function unifiedError(response: SateResponse) {
  const { data, config } = response;

  if (!data) {
    ElMessage.error(`数据返回格式错误：${config.url}`);
    return;
  }

  const { code, msg } = data;

  if (code === 200) return;

  code < 500 && console.error(Object.assign(data, { url: config.url }));

  if ([401, 403].includes(code)) {
    ElMessageBox.confirm('用户信息过期，请重新登录', '警告', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning',
    }).then(async () => {
      store.commit('user/set_token', { type: OVERDUE });
      store.commit('user/set_login', 2);
      store.commit('user/set_info', {});
      store.commit('user/set_role', '');
    }).catch(() => {});
    return;
  }

  ElMessage.error(msg);
}
