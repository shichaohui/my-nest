import Taro from '@tarojs/taro';
import { toastError, toastSuccess } from './toast';

/** 保存图片到相册 */
export async function saveImageToPhotosAlbum(filePath: string) {
  try {
    await Taro.saveImageToPhotosAlbum({ filePath });
    toastSuccess({ title: '保存成功' });
  } catch (err) {
    console.error(err);
    const errMsgs = {
      'saveImageToPhotosAlbum:fail auth deny': '无相册权限',
      'saveImageToPhotosAlbum:fail cancel': '已取消保存'
    };
    toastError({ title: errMsgs[err.errMsg] || '保存失败' });
  }
}
