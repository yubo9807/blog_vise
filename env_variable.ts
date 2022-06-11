const BASE_API = '/api';

// 生产环境
let env: any = {

  NODE_ENV: process.env.NODE_ENV,

  BASE_API,

  BASE_ROUTE_URL: '/vise',

  VISIT_ORIGIN: typeof window === 'object' && location.origin,

  SYSTEM_NAME: '后台管理系统'

};

// 开发环境
if (process.env.NODE_ENV === 'development') {

  const VISIT_ORIGIN = 'http://127.0.0.1:20010'

  env = Object.assign(env, {

    BASE_API: VISIT_ORIGIN + BASE_API,

    VISIT_ORIGIN,

  })

}

export default Object.freeze(env);
