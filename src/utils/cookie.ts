declare const cookieStore: any;

/**
 * 获取 cookie 指定参数
 * @param {*} key 要获取的 key
 * @returns 
 */
export function getCookie(key: string) {
  // if (typeof cookieStore === 'object') {
  //   const obj = await cookieStore.get(key)
  //   return obj?.value
  // }
  const cookie = document.cookie;
  const str = cookie.replace(/\s/g, '');
  const obj: any = {};
  str.split(';').forEach(val => {
    obj[val.split('=')[0]] = val.split('=')[1];
  })
  return obj[key];
}
