
/**
 * 深度克隆对象
 * JSON.parse(JSON.stringify(obj))  // 此方法无法合并代理对象
 * @param obj 
 */
 export function cloneObj(obj: any) {
  // 克隆算法
  if (obj instanceof Array) return cloneArray(obj);
  else if (obj instanceof Object) return cloneObject(obj);
  else return obj;
}
function cloneObject (obj: any) {
  let result = {};
  let names = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < names.length; i ++) {
      result[names[i]] = cloneObj(obj[names[i]]);
  }
  return result;
}
function cloneArray (obj: any[]) {
  let result = new Array(obj.length);
  for (let i = 0; i < result.length; i ++) {
      result[i] = cloneObj(obj[i]);
  }
  return result;
}

/**
 * 获取一个对象的字节大小
 * @param obj 
 * @returns 
 */
export function getLSUsedSpace(obj: any) {

  const length = Object.keys(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) return total;

    if (typeof obj[curKey] === 'string') total += obj[curKey].length + curKey.length;
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length + curKey.length;

    return total;
  }, 0);

  const symbolLen = Object.getOwnPropertySymbols(obj).reduce((total, curKey) => {
    if (!obj.hasOwnProperty(curKey)) return total;

    if (typeof obj[curKey] === 'string') total += obj[curKey].length;
    else total += JSON.stringify(obj[curKey]).replace(/"/g, '').length;

    return total;
  }, 0);

  return length + symbolLen;
}
