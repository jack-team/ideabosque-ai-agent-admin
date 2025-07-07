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