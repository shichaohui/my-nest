import { ShareAppMessageReturn, ShareTimelineReturnObject } from '@tarojs/taro';
import { maskList, shareImage, shareTitle } from './newYear';

function getShareInfo(): ShareAppMessageReturn | ShareTimelineReturnObject {
  return {
    title: shareTitle,
    imageUrl: shareImage
  };
}

function getMaskList(): WXAvatar.Mask[] {
  return maskList;
}

export default {
  getShareInfo,
  getMaskList
};
