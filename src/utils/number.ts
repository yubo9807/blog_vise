/**
 * 生成随机数，~~ 比 floor 性能更佳（不要传负数）
 * @param max 最大值（取不到，只可取正整数）
 * @param min 最小值
 */
export const randomNum = (max: number, min: number = 0) => {
  return ~~(Math.random() * (max - min) + min);
}

/**
 * 计算字节大小
 * @param {*} num
 * @param {*} utils
 * @returns
 */
export function calculateByte(num = 0, utils = ['Byte', 'KB', 'MB', 'GB', 'TB']) {
  const len = utils.length;
  let str = '';
  if (num < 1024) str = num + utils[0];
  for (let i = 1; i < len; i++) {
    if (num > 1024 ** i) str = Math.ceil(num / (1024 ** i)) + utils[i];
  }
  return str;
}