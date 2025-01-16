// 判断是否为空值或空字符串
export function isNull(v: string) {
  return v === null || typeof v === "undefined" || v === "";
}

export const formatNumber = (str: string, def = 0) => {
  const num = Number(str);
  if (isNull(str) || Number.isNaN(num)) {
    return def;
  }
  return num;
}