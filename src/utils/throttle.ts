/**
 * 节流函数
 * @param func 原函数
 * @param wait  等待时间
 * @returns 节流函数
 */
function throttle<T extends (...args: any) => any>(func: T, wait?: number): T {
  let enabled = true;
  return function(...args: any) {
    if (!enabled) {
      return;
    }
    const result = func(...args);
    enabled = false;
    setTimeout(() => (enabled = true), wait);
    return result;
  } as T;
}

export default throttle;
