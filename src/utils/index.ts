import dayjs from "dayjs";

export function getUrlParams(name: string) {
  const search = location.search.substring(1);
  const pairs = search.split('&');
  for (const pair of pairs) {
    let [key, value] = pair.split('=') || [];
    if (key) key = decodeURIComponent(key);
    if (value) value = decodeURIComponent(value);
    if (key === name) return value;
  }
}

export function formatDate(date: string, format = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs(date).format(format);
}

export const parseJson = (json: string) => {
  try {
    return JSON.parse(json);
  } catch (err) {
    return null;
  }
}

export function requestWrapper<T extends GlobalNoop>(fn: T, params?: Record<string, any>): ReturnType<T> {
  return fn({ limit: 1000, pageNumber: 1, ...params });
}


export function hexToRgba(hex: string, opacity = 1) {
  // 移除#符号并处理3位简写格式（如#FFF → #FFFFFF）
  hex = hex.toLowerCase().replace(/^#/, '');
  if (hex.length === 3) {
    hex = hex.split('').map(c => c + c).join('');
  }
  // 提取并转换分量
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}
