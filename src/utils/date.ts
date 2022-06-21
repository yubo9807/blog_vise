
/**
 * 获取当前时间
 * @param t 
 * @returns 
 */
export function getCurrentDate(t: string | number | Date) {
  let date = t ? new Date(t) : new Date();
  return {
    year: date.getFullYear() + '',
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
    second: date.getSeconds()
  }
}

/**
 * 格式化时间
 * @param formater 
 * @param t 
 * @returns 
 */
export function dateFormater(t: number | Date = new Date(), formater: string = 'YYYY-MM-DD hh:mm:ss',) {
  const { year, month, day, hour, minute, second } = getCurrentDate(t);
  return formater.replace(/YYYY/g, year)
    .replace(/YY/g, year.substr(2, 2))
    .replace(/MM/g, (month < 10 ? '0' : '') + month)
    .replace(/DD/g, (day < 10 ? '0' : '') + day)
    .replace(/hh/g, (hour < 10 ? '0' : '') + hour)
    .replace(/mm/g, (minute < 10 ? '0' : '') + minute)
    .replace(/ss/g, (second < 10 ? '0' : '') + second);
}

/**
 * 获取当月的天数
 * @param time 格式：2022-5
 */
export function getMonthDays(time: string | null = null) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const d = new Date(year, month, 0);
  return d.getDate();
}

/**
 * 计算距离当前时间的时间差
 */
export function getTimeDistance(diff = 0) {
  if (diff < 60) {
    return diff + '秒';
  } else if (diff < 3600) {
    return Math.floor(diff / 60) + '分钟';
  } else if (diff < 3600 * 24) {
    return Math.floor(diff / 3600) + '小时';
  } else if (diff < 3600 * 24 * 365) {
    return Math.floor(diff / 3600 / 24) + '天';
  }
}