const res = {
  data: {
    Home: { roles: null, title: '首页', },
    Example: { roles: ['admin', 'visit'], title: '例子', hidden: true, /* disable: true */ },
    About: { roles: ['unit'], title: '关于', alwaysShow: true }
  },
  code: 200,
  msg: '',
}

const err = {
  code: 500,
  msg: 'error',
}

// 模拟请求
export const requset2 = () => {
  return new Promise((resolve, reject) => {
    const random = 1;
    if (random > .1) {
      setTimeout(() => {
        resolve(res)
      }, 500)
    } else {
      setTimeout(() => {
        reject(err)
      }, 500)
    }
  })
}