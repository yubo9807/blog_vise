/*
 * @Description: 关于网络请求的一些工具函数
 * @Author: yangyb
 * @Date: 2022-02-23 08:58:26
 * @LastEditors: yangyb
 * @LastEditTime: 2022-02-28 17:06:51
 */

import { AxiosInstance } from 'axios';

interface Option {
  retries?: number,
  retryDelay?: number,
  retryTips?: Function
}
const defaultOption = {
  retries: 2,
  retryDelay: 500,
  retryTips: () => {}
}

/**
 * @description: axios请求重试
 * @author: yangyb
 * @param {*} defaultOption
 * @returns {*}
 */
export function axiosRetry(axios: AxiosInstance, option: Option = defaultOption) {
  // 没有用 axios-retry 这个库的原因：他没有对 "后端把业务错误报在 error 中" 的情况做处理

  option = Object.assign(defaultOption, option);

  axios.interceptors.request.use((config) => {
    return config
  })

  // 请求出现错误
  axios.interceptors.response.use(null, async(error) => {
    const { config, response } = error;
    if (!config) return Promise.reject(error);
    if (response) return Promise.resolve(response);  // 针对后端那些把业务错误报在 error 中的人

    config.retryCount ||= 0;
    config.retryCount++;

    return new Promise((resolve, reject) => {
      setTimeout(async() => {
        if (config.retryCount >= option.retries) return reject(config);
        else {
          option.retryTips();  // 再次请求时你可以给用户些提示
          return resolve(await axios(config));  // 再次请求
        }
      }, option.retryDelay);
    })
  })
}
