
/**
 * 生成随机颜色
 */
export function createColor() {
  return '#' + Math.random().toString(16).slice(2, 8);
}