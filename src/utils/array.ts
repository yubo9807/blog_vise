/**
 * 获取数组中存在该值的索引值
 * @param {*} arr 数组
 * @param {*} val 查询value值
 * @returns 返回一个索引值，小于 0 时表示不存在
 */
 export function getIndex(arr: any[], val: string | number) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
      return i
    }
  }
  return -1
}