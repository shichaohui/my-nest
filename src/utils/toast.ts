import Taro from '@tarojs/taro';

type Option = Omit<Taro.showToast.Option, 'icon'>;

/** 无 Icon */
export function toast(option: Option) {
  return Taro.showToast({
    ...option,
    icon: 'none',
  });
}

/** 成功 */
export function toastSuccess(option: Option) {
  return Taro.showToast({
    ...option,
    icon: 'success',
  });
}

/** 错误 */
export function toastError(option: Option) {
  return Taro.showToast({
    ...option,
    icon: 'error',
  });
}

/** Loading */
export function toastLoading(option: Option) {
  return Taro.showToast({
    ...option,
    icon: 'loading',
  });
}
